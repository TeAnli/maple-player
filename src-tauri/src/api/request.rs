use crate::util::http;
use crate::{
    api::{data, urls},
    AppState,
};
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

#[tauri::command]
pub async fn login(state: State<'_, AppState>) -> Result<data::LoginResponse, String> {
    let api_url = String::from(urls::QRCODE_GENERATE_URL);
    let login_info: data::LoginResponse = http::send_get_request(state, api_url).await?;
    Ok(login_info)
}
#[tauri::command]
pub async fn scan_check(state: State<'_, AppState>, qrcode_key: String) -> Result<i32, String> {
    let api_url = format!("{}?qrcode_key={}", urls::QRCODE_POLL_URL, qrcode_key);
    let scan_info: data::ScanResponse = http::send_get_request(state, api_url).await?;
    Ok(scan_info.data.code)
}
#[tauri::command]
pub async fn get_all_folder(
    state: State<'_, AppState>,
    uid: i64,
) -> Result<Vec<data::FolderInfo>, String> {
    let api_url = format!("{}?up_mid={}", urls::GET_ALL_FOLDER_URL, uid);
    let folder_info: data::FolderResponse = http::send_get_request(state.clone(), api_url).await?;
    let mut folder_list: Vec<data::FolderInfo> = Vec::new();
    for folder in folder_info.data.list {
        let folder_info = get_folder_info(state.clone(), folder.id).await?;
        folder_list.push(folder_info);
    }
    Ok(folder_list)
}
pub async fn get_folder_info(
    state: State<'_, AppState>,
    folder_id: i32,
) -> Result<data::FolderInfo, String> {
    let api_url = format!("{}?media_id={}", urls::GET_FOLDER_INFO_URL, folder_id);
    let folder_info: data::FolderInfoResponse = http::send_get_request(state, api_url).await?;
    Ok(folder_info.data)
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
