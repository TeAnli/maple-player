use std::sync::Arc;
use reqwest::{cookie::Jar, Client};
use tauri::State;

use crate::{api::{data, urls}, AppState};


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

// By the bvid search Bilibili video info
#[tauri::command]
pub async fn search_bvid_info(state:State<'_, AppState>, bvid: std::sync::Mutex<String>) -> Result<data::VideoInfo, String> {
    let api_url: String = format!(
        "https://api.bilibili.com/x/web-interface/view?bvid={}",
        bvid.lock().map_err(|e| e.to_string())?
    );

    let response = state.http_client.lock().await.client
        .get(api_url)
        .send()
        .await
        .map_err(|e| e.to_string())?;
    let video_info: data::VideoInfo = response.json().await.map_err(|e| e.to_string())?;

    Ok(video_info)
}

#[tauri::command]
pub async fn login(state:State<'_, AppState>) -> Result<data::LoginResponse, String> {

    let api_url = urls::QRCODE_GENERATE_URL;
    let response = state.http_client.lock().await.client
        .get(api_url)
        .send()
        .await
        .map_err(|e| e.to_string())?;
    let login_info: data::LoginResponse = response.json().await.map_err(|e| e.to_string())?;
    Ok(login_info)
}
#[tauri::command]
pub async fn scan_check(state:State<'_, AppState>,qrcode_key: String) -> Result<i32, String> {
    let api_url = format!("{}?qrcode_key={}",urls::QRCODE_POLL_URL, qrcode_key);
    let response = state.http_client.lock().await.client
        .get(api_url)
        .send()
        .await
        .map_err(|e| e.to_string())?;
    let scan_info: data::ScanResponse = response.json().await.map_err(|e| e.to_string())?;
    Ok(scan_info.data.code)
}
#[tauri::command]
pub async fn get_all_folder(state:State<'_, AppState>, uid: i64) -> Result<(), String> {
    let api_url = format!("{}?up_mid={}", urls::GET_ALL_FOLDER_URL, uid);
    let response = state.http_client.lock().await.client
        .get(api_url)
        .send()
        .await
        .map_err(|e| e.to_string())?;
    let info: data::FolderResponse = response.json().await.map_err(|e|e.to_string())?;
    println!("{:#?}", info);
    Ok(())
}

#[tauri::command]
pub async fn create_folder(state:State<'_, AppState>, uid: i64) -> Result<(), String> {
    let api_url = format!("{}?up_mid={}", urls::CREATE_FOLDER_URL, uid);
    let response = state.http_client.lock().await.client
        .get(api_url)
        .send()
        .await
        .map_err(|e| e.to_string())?;
    let info: data::FolderResponse = response.json().await.map_err(|e|e.to_string())?;
    println!("{:#?}", info);
    Ok(())
}
