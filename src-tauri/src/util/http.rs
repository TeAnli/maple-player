use std::sync::Arc;
use reqwest::{cookie::Jar, Client};
use tauri::State;
use crate::AppState;


pub struct HttpClient {
    client: Client,
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
    let response = state.http_client.lock().await.client
        .get(url)
        .send()
        .await
        .map_err(|e| e.to_string())?;
    response.json().await.map_err(|e| e.to_string())
}