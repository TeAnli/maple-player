use std::path::PathBuf;
use std::fs;
use crate::error::AppError;

pub mod http;
pub mod wbi;

pub fn get_user_home_dir() -> Option<PathBuf> {
    dirs::home_dir()
}
pub fn get_user_music_dir() -> Option<PathBuf> {
    dirs::audio_dir()
}
pub fn get_app_config_dir(app_name: &str) -> Option<PathBuf> {
    dirs::config_dir().map(|dir| dir.join(app_name))
}

pub fn ensure_app_config_dir(app_name: &str) -> Result<PathBuf, AppError> {
    let config_dir = get_app_config_dir(app_name)
        .ok_or_else(|| AppError::IO(std::io::Error::new(std::io::ErrorKind::NotFound, "无法获取配置目录")))?;
    
    if !config_dir.exists() {
        fs::create_dir_all(&config_dir)
            .map_err(|e| {
                println!("创建配置目录失败: {}", e);
                AppError::IO(e)
            })?;
        println!("已创建配置目录: {}", config_dir.display());
    } else {
        println!("配置目录已存在: {}", config_dir.display());
    }
    
    Ok(config_dir)
}