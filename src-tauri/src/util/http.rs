use crate::error::AppError;
use reqwest::cookie::CookieStore;
use reqwest::header::HeaderMap;
use reqwest::{cookie::Jar, header, Client};
use std::sync::Arc;


pub struct HttpClient {
    pub client: Client,
    pub cookie_jar: Arc<Jar>,
}

impl HttpClient {
    /**
     * 创建新的HTTP客户端实例
     * 
     * 初始化一个带有cookie存储和用户代理的HTTP客户端
     * 
     * @return Self 新的HttpClient实例
     */
    pub fn new() -> Self {
        let cookie_jar = Arc::new(Jar::default());
        let client = Client::builder()
            .cookie_store(true)
            .cookie_provider(cookie_jar.clone())
            .user_agent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36")
            .build()
            .expect("Failed to create http client");
        HttpClient { client, cookie_jar }
    }
    
    /**
     * 保存cookie到本地存储
     * 
     * TODO: 实现cookie的持久化存储功能
     */
    pub fn save_cookie() {

    }
    
    /**
     * 从本地存储加载cookie
     * 
     * TODO: 实现从持久化存储加载cookie的功能
     */
    pub fn load_cookie() {

    }
}

/**
 * 创建通用的请求头
 * 
 * @return HeaderMap 包含通用头部的HeaderMap
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
 * 
 * @param client HTTP客户端
 * @param url 请求URL
 * @return Result<T, AppError> 解析后的响应数据
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
 * 
 * @param client HTTP客户端
 * @param url 请求URL
 * @return Result<reqwest::Response, AppError> 原始HTTP响应
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
