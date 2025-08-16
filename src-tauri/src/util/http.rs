use crate::error::AppError;
use reqwest::header::HeaderMap;
use reqwest::{header, Client};
/**
 * 创建通用的请求头
 * 返回包含User-Agent和Referer等通用头部的HeaderMap
 * # 返回
 * * `HeaderMap` 包含通用头部的HeaderMap
 */
fn create_common_headers() -> HeaderMap {
    let mut headers = HeaderMap::new();
    headers.insert(
        header::USER_AGENT, 
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
            .parse()
            .unwrap()
    );
    headers.insert(
        header::REFERER,
        "https://www.bilibili.com/"
            .parse()
            .unwrap()
    );
    headers
}

/**
 * 发送GET请求并将响应解析为指定类型
 * # 参数
 * * `client` HTTP客户端
 * * `url` 请求URL
 * # 返回
 * * `Result<T, AppError>` 成功时返回解析后的响应数据，失败时返回错误
 */
pub async fn get_data<T>(client: &Client, url: String) -> Result<T, AppError>
where
    T: serde::de::DeserializeOwned,
{
    println!("发送GET请求: {}", url);
    let headers = create_common_headers();
    
    let response = client
        .get(url)
        .headers(headers)
        .send()
        .await
        .map_err(|error| {
            println!("HTTP请求失败: {}", error);
            AppError::HttpRequest(error)
        })?;

    response
        .json()
        .await
        .map_err(|error| {
            println!("解析JSON响应失败: {}", error);
            AppError::HttpRequest(error)
        })
}

/**
 * 发送GET请求并返回原始响应
 * # 参数
 * * `client` HTTP客户端
 * * `url` 请求URL
 * # 返回
 * * `Result<reqwest::Response, AppError>` 成功时返回原始HTTP响应，失败时返回错误
 */
pub async fn get_response(client: &Client, url: String) -> Result<reqwest::Response, AppError> {
    println!("发送GET数据请求: {}", url);
    let headers = create_common_headers();
    
    let response: reqwest::Response = client
        .get(url)
        .headers(headers)
        .send()
        .await
        .map_err(|error| {
            println!("HTTP数据请求失败: {}", error);
            AppError::HttpRequest(error)
        })?;
    
    Ok(response)
}
