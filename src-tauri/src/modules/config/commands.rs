use tauri::State;
use tokio::sync::Mutex;

use crate::{error::AppError, AppState};
use crate::modules::config::manager::AppConfig;

/**
 * 保存应用配置
 */
#[tauri::command]
pub async fn save_app_config(
    state: State<'_, Mutex<AppState>>,
    config: AppConfig,
) -> Result<String, AppError> {
    state.lock().await.config_manager.save(&config, Some("app.json"))?;
    println!("应用配置已保存");
    Ok("应用配置已保存".to_string())
}
