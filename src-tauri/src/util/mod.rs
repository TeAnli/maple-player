use std::path::PathBuf;
use std::fs;
use crate::error::AppError;

pub mod config;
pub mod http;
pub mod wbi;
pub mod download;

/**
 * 获取用户目录
 * 
 * @return Option<PathBuf> 用户目录路径，如果无法获取则返回None
 */
pub fn get_user_home_dir() -> Option<PathBuf> {
    dirs::home_dir()
}
/**
 * 获取用户音乐目录
 * 
 * @return Option<PathBuf> 用户音乐目录路径，如果无法获取则返回None
 */
pub fn get_user_music_dir() -> Option<PathBuf> {
    dirs::audio_dir()
}
/**
 * 获取应用配置目录
 * 
 * @param app_name 应用名称
 * @return Option<PathBuf> 应用配置目录路径，如果无法获取则返回None
 */
pub fn get_app_config_dir(app_name: &str) -> Option<PathBuf> {
    dirs::config_dir().map(|dir| dir.join(app_name))
}

/**
 * 确保应用配置目录存在，如果不存在则创建
 * 
 * @param app_name 应用名称
 * @return Result<PathBuf, AppError> 配置目录路径，如果创建失败则返回错误
 */
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