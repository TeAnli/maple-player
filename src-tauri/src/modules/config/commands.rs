use tauri::State;
use tokio::sync::Mutex;

use crate::modules::config::manager::AppConfig;
use crate::{error::AppError, AppState};

/**
 * 保存应用配置
 */
#[tauri::command]
pub async fn save_app_config(
    state: State<'_, Mutex<AppState>>,
    download_path: String,
    auto_play: bool,
    header_visible: bool,
) -> Result<String, AppError> {
    let config = AppConfig {
        download_path,
        auto_play,
        header_visible,
    };
    state.lock().await.config_manager.app_config = config.clone();
    state
        .lock()
        .await
        .config_manager
        .save(&config, Some("app.json"))?;
    println!("应用配置已保存");
    Ok("应用配置已保存".to_string())
}
/**
 * 获取应用配置
 */
#[tauri::command]
pub async fn get_app_config(state: State<'_, Mutex<AppState>>) -> Result<AppConfig, AppError> {
    let config = state.lock().await.config_manager.app_config.clone();
    println!("应用配置已加载");
    Ok(config)
}
