use crate::error::AppError;
use reqwest::header::HeaderMap;
use reqwest::{cookie::Jar, header, Client};
use std::sync::Arc;


pub struct HttpClient {
    pub client: Client,
    pub cookie_jar: Arc<Jar>,
}

impl HttpClient {
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
    pub fn save(&self) {
        todo!("存储cookie")
    }
}

pub async fn send_get_request<T>(client: &Client, url: String) -> Result<T, AppError>
where
    T: serde::de::DeserializeOwned,
{
    let mut headers = HeaderMap::new();
    headers.insert(header::USER_AGENT, "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36".parse().unwrap());
    headers.insert(
        header::REFERER,
        "https://www.bilibili.com/".parse().unwrap(),
    );
    let response = client
        .get(url)
        .headers(headers)
        .send()
        .await
        .map_err(|error| AppError::HttpRequest(error))?;

    response
        .json()
        .await
        .map_err(|error| AppError::HttpRequest(error))
}

pub async fn send_get_data(client: &Client, url: String) -> Result<reqwest::Response, AppError> {
    let mut headers = HeaderMap::new();
    headers.insert(header::USER_AGENT, "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36".parse().unwrap());
    headers.insert(
        header::REFERER,
        "https://www.bilibili.com/".parse().unwrap(),
    );
    let response: reqwest::Response = client
        .get(url)
        .headers(headers)
        .send()
        .await
        .map_err(|error| AppError::HttpRequest(error))?;
    Ok(response)
}
