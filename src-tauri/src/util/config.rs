use serde::{de::DeserializeOwned, Deserialize, Serialize};

use crate::{error::AppError, util::ensure_app_config_dir};
use std::{fs};

#[derive(Deserialize, Serialize, Debug, Default)]
pub struct UserConfig {
    pub id: String,
}
#[derive(Deserialize, Serialize, Debug, Default)]
pub struct AppConfig {
    pub download_path: String,
}
/**
 * 配置管理器
 * 负责应用配置和用户配置的加载与保存
 */
pub struct ConfigManager{
    pub app_config: AppConfig,
    pub user_config: UserConfig,
    pub config_dir: String,
}

impl ConfigManager {
    /**
     * 初始化配置管理器
     * 
     * @param custom_config_dir 可选的自定义配置目录路径
     * @return Result<Self, AppError> 配置管理器实例或错误
     */
    pub fn init() -> Result<Self, AppError> {

        // 确保应用配置目录存在
        let app_config_dir = ensure_app_config_dir("maple-player")?;
        let config_dir = app_config_dir.to_string_lossy().to_string();
    
        
        // 创建配置管理器实例
        let mut config_manager = Self { 
            app_config: AppConfig::default(), 
            user_config: UserConfig::default(),
            config_dir,
        };
        
        // 尝试加载现有配置
        let app_config_path = config_manager.get_config_path("app.json");
        if let Ok(app_config) = config_manager.load::<AppConfig>(&app_config_path) {
            config_manager.app_config = app_config;
            println!("已加载应用配置");
        } else {
            println!("未找到应用配置，使用默认值");
            // 保存默认配置
            let _ = config_manager.save(&config_manager.app_config, Some("app.json"));
        }
        
        let user_config_path = config_manager.get_config_path("user.json");
        if let Ok(user_config) = config_manager.load::<UserConfig>(&user_config_path) {
            config_manager.user_config = user_config;
            println!("已加载用户配置");
        } else {
            println!("未找到用户配置，使用默认值");
            // 保存默认配置
            let _ = config_manager.save(&config_manager.user_config, Some("user.json"));
        }
        
        Ok(config_manager)
    }
    
    /**
     * 获取配置文件的完整路径
     * 
     * @param filename 配置文件名
     * @return String 完整的配置文件路径
     */
    pub fn get_config_path(&self, filename: &str) -> String {
        let config_dir = &self.config_dir;
        format!("{config_dir}/{filename}")
    }
    
    /**
     * 从指定路径加载配置
     * 
     * @param path 配置文件路径
     * @return Result<T, AppError> 加载结果
     */
    pub fn load<T: DeserializeOwned>(&self, path: &str) -> Result<T, AppError> {
        println!("加载配置文件: {}", path);
        let file_content = fs::read_to_string(path)?;
        let config = serde_json::from_str(&file_content)?;
        Ok(config)
    }

    /**
     * 保存配置到指定文件
     * 
     * @param config 要保存的配置对象
     * @param filename 配置文件名，默认为"app.json"
     * @return Result<(), AppError> 保存结果
     */
    pub fn save<T: Serialize>(&self, config: &T, filename: Option<&str>) -> Result<(), AppError> {
        let file_path = self.get_config_path(filename.unwrap_or("app.json"));
        println!("保存配置到: {}", file_path);
        
        let serialized_config = serde_json::to_string_pretty(config)?;
        fs::write(file_path, serialized_config)?;
        Ok(())
    }
}
