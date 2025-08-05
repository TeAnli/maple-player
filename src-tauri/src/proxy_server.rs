use anyhow::*;
use hyper::service::{make_service_fn, service_fn};
use hyper::{Body, Client, Request, Response, Server};
use std::net::SocketAddr;
use std::sync::Arc;

/**
 * 前端通过本地代理服务器发送的请求被其拦截
 */
fn request_crate(request: &mut Request<Body>) -> Result<()> {
    /* 移除截取的请求的请求头host, referer, user-agent参数 */
    for key in &["host", "referer", "user-agent"] {
        request.headers_mut().remove(*key);
    }
    /* 重新加入新的请求头参数 */
    request
        .headers_mut()
        .insert("host", "upos-sz-mirrorcoso1.bilivideo.com".parse()?);
    request
        .headers_mut()
        .insert("referer", "https://www.bilibili.com/".parse()?);
    request
        .headers_mut()
        .insert("user-agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Safari/605.1.15".parse()?);
    /* 获取请求的属性 */
    let uri = request.uri();
    let path = uri.path();
    let uri_context = match uri.query() {
        Some(query_item) => format!("https://upos-sz-mirrorcoso1.bilivideo.com{path}?{query_item}"),
        None => format!("https://upos-sz-mirrorcoso1.bilivideo.com{path}"),
    };

    *request.uri_mut() = uri_context.parse().expect("failed to parse URI");
    Ok(())
}
/**
 * 处理跨域，反向发送获取的音视频数据。
 */
fn response_crate(response: &mut Response<Body>) -> Result<()> {
    for key in &["content-type", "access-control-allow-origin"] {
        response.headers_mut().remove(*key);
    }
    /* 音视频格式 */
    response
        .headers_mut()
        .insert("content-type", "video/mp4".parse()?);
    /* 允许跨域 */
    response
        .headers_mut()
        .insert("access-control-allow-origin", "*".parse()?);

    Ok(())
}

#[tokio::main]
pub(crate) async fn main() -> Result<()> {
    let https = hyper_rustls::HttpsConnectorBuilder::new()
        .with_native_roots()
        .https_only()
        .enable_http1()
        .build();
    let client: Client<_, Body> = Client::builder().build(https);
    let client: Arc<Client<_, Body>> = Arc::new(client);

    let address = SocketAddr::from(([127, 0, 0, 1], 29417));
    let service_handler = make_service_fn(move |_| {
        let client = Arc::clone(&client);
        async move {
            Ok(service_fn(move |mut request: Request<Body>| {
                let client = Arc::clone(&client);
                async move {
                    request_crate(&mut request)?;
                    let response = client.request(request).await.context("proxy request");
                    let mut response: Response<Body> = match response {
                        Result::Ok(res) => res,
                        Err(_) => Response::new(Body::from("proxy Error")),
                    };
                    response_crate(&mut response)?;
                    Ok(response)
                }
            }))
        }
    });
    let _server = Server::bind(&address)
        .serve(service_handler)
        .await
        .context("error starting server")?;

    Ok(())
}
