use std::fmt::format;
use tauri::State;
use tokio::sync::Mutex;

use crate::AppState;
use crate::error::AppError;
// 
// #[tauri::command]
// pub async fn set_download_path(
//     state: State<'_, Mutex<AppState>>,
//     download_path: String,
// ) -> Result<String, AppError> {
//     state.lock().await.config.download_path = download_path;
//     let path = &state.lock().await.config.download_path;
//     Ok(format!("Successfully to update download path: {path}"))
// }
// #[tauri::command]
// pub async fn get_config(state: State<'_, Mutex<AppState>>) -> Result<String, String> {
//     let path = state.lock().await.config.download_path.clone();
//     Ok(path)
// }
