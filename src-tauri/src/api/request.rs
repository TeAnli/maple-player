use std::io::Read;

use crate::util::http;
use crate::{
    api::{data, urls},
    AppState,
};
use reqwest::header;
use serde_json::Value;
use tauri::State;

// By the bvid search Bilibili video info
#[tauri::command]
pub async fn search_bvid_info(
    state: State<'_, AppState>,
    bvid: String,
) -> Result<data::VideoData, String> {
    let api_url = format!("{}?bvid={}", urls::SEARCH_BVID_INFO, bvid);
    let video_info: data::VideoResponse = http::send_get_request(state, api_url).await?;
    Ok(video_info.data)
}

// remember to call `.manage(MyState::default())`
#[tauri::command]
pub async fn get_cid_by_bvid(state: State<'_, AppState>, bvid: String) -> Result<i64, String> {
    let api_url = format!("{}?bvid={}", urls::GET_VEDIO_INFO, bvid);
    let vedio: data::CidResponse = http::send_get_request(state, api_url).await?;
    Ok(vedio.data.cid)
}

#[tauri::command]
pub async fn login(state: State<'_, AppState>) -> Result<data::LoginResponse, String> {
    let api_url = String::from(urls::QRCODE_GENERATE_URL);
    let login_info: data::LoginResponse = http::send_get_request(state, api_url).await?;
    Ok(login_info)
}
#[tauri::command]
pub async fn scan_check(state: State<'_, AppState>, qrcode_key: String) -> Result<i64, String> {
    let api_url = format!("{}?qrcode_key={}", urls::QRCODE_POLL_URL, qrcode_key);
    let scan_info: data::ScanResponse = http::send_get_request(state, api_url).await?;
    Ok(scan_info.data.code)
}
#[tauri::command]
pub async fn get_all_folder(
    state: State<'_, AppState>,
    uid: i64,
) -> Result<Vec<data::PlaylistData>, String> {
    let api_url = format!("{}?up_mid={}", urls::GET_ALL_FOLDER_URL, uid);
    let folder_info: data::FolderResponse = http::send_get_request(state.clone(), api_url).await?;
    let mut folder_list: Vec<data::PlaylistData> = Vec::new();
    for folder in folder_info.data.list {
        let playlist = get_folder_info(state.clone(), folder.id).await?;
        folder_list.push(playlist);
    }
    Ok(folder_list)
}
pub async fn get_folder_info(
    state: State<'_, AppState>,
    folder_id: i64,
) -> Result<data::PlaylistData, String> {
    let api_url = format!(
        "{}?media_id={}&ps={}",
        urls::GET_FOLDER_INFO_URL,
        folder_id,
        20
    );
    let playlist_info: data::PlaylistResponse = http::send_get_request(state, api_url).await?;
    Ok(playlist_info.data)
}

#[tauri::command]
pub async fn create_folder(state: State<'_, AppState>, uid: i64) -> Result<(), String> {
    let api_url = format!("{}?up_mid={}", urls::CREATE_FOLDER_URL, uid);
    let info: data::FolderResponse = http::send_get_request(state, api_url).await?;
    println!("{:#?}", info);
    Ok(())
}
#[tauri::command]
pub async fn get_user_data(state: State<'_, AppState>) -> Result<data::UserData, String> {
    let api_url = format!("{}", urls::GET_USER_DATA_URL);
    let info: data::UserResponse = http::send_get_request(state, api_url).await?;
    Ok(info.data)
}
#[tauri::command]
pub async fn download_video(
    state: State<'_, AppState>,
    cid: i64,
    bvid: String,
) -> Result<String, String> {
    let api_url = format!(
        "{}?fnval={}&bvid={}&cid={}",
        urls::GET_VEDIO_DOWNLOAD_URL,
        4048,
        bvid,
        cid
    );
    let client = state.http_client.lock().await.client.clone();

    let response = client.get(api_url)
        .header(header::USER_AGENT, "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36")
        .header(header::REFERER, "https://www.bilibili.com/")
        .send()
        .await.map_err(|e| e.to_string())?;
    let json: Value = response.json().await.map_err(|e| e.to_string())?;
    let audio_url = json["data"]["dash"]["audio"][0]["base_url"].as_str().unwrap();
    Ok(String::from(audio_url))
}
