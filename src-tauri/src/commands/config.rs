use tauri::State;
use tokio::sync::Mutex;

use crate::AppState;

#[tauri::command]
pub async fn set_download_path(
    state: State<'_, Mutex<AppState>>,
    download_path: String,
) -> Result<String, String> {
    state.lock().await.config.download_path = download_path;
    Ok(String::from("successfully to update download path"))
}
#[tauri::command]
pub async fn get_config(state: State<'_, Mutex<AppState>>) -> Result<String, String> {
    let path = state.lock().await.config.download_path.clone();
    Ok(path)
}
