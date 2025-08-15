use tauri::State;
use tokio::sync::Mutex;

use crate::{error::AppError, util::config::AppConfig, AppState};

/**
 * 保存应用配置
 * 
 * @param state 应用状态
 * @param config 应用配置
 * @return Result<String, AppError> 保存结果消息
 */
#[tauri::command]
pub async fn save_app_config(
    state: State<'_, Mutex<AppState>>,
    config: AppConfig,
) -> Result<String, AppError> {
    state.lock().await.config_manager.save(&config, Some("app.json"))?;
    println!("应用配置已保存");
    Ok(format!("应用配置已保存"))
}
