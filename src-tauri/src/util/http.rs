use crate::AppState;
use reqwest::{cookie::Jar, header, Client};
use serde::{Deserialize, Serialize};
use std::sync::Arc;
use tauri::State;
#[derive(Debug, Default, Serialize, Deserialize, Clone)]
pub struct Progress {
    pub total_size: u64,
    pub current_size: u64,
}
impl Progress {
    pub fn new(total_size: u64, current_size: u64) -> Self {
        Self {
            total_size,
            current_size,
        }
    }
    pub fn progress(&self) -> f64 {
        self.current_size as f64 / self.total_size as f64
    }
}
pub struct HttpClient {
    pub client: Client,
}
impl HttpClient {
    pub fn new() -> Self {
        let jar = Arc::new(Jar::default());
        let client = Client::builder()
            .cookie_provider(jar.clone())
            .build()
            .expect("Failed to create http client");
        HttpClient { client }
    }
}

pub async fn send_get_request<T>(state: State<'_, AppState>, url: String) -> Result<T, String>
where
    T: serde::de::DeserializeOwned,
{
    let response = state
        .http_client
        .lock()
        .await
        .client
        .get(url)
        .header(header::USER_AGENT, "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36")
        .header(header::REFERER, "https://www.bilibili.com/")
        .send()
        .await
        .map_err(|e| e.to_string())?;
    response.json().await.map_err(|e| e.to_string())
}
