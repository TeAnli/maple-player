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
    pub fn init() -> Result<Self, AppError> {

        let app_config_dir = ensure_app_config_dir("maple-player")?;
        let config_dir = app_config_dir.to_string_lossy().to_string();
    

        let mut config_manager = Self { 
            app_config: AppConfig::default(), 
            user_config: UserConfig::default(),
            config_dir,
        };

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
     * # 参数
     * * `filename` 配置文件名
     * # 返回
     * * `String` 完整的配置文件路径
     */
    pub fn get_config_path(&self, filename: &str) -> String {
        let config_dir = &self.config_dir;
        format!("{config_dir}/{filename}")
    }
    
    /**
     * 从指定路径加载配置
     * # 参数
     * * `path` 配置文件路径
     * # 返回
     * * `Result<T, AppError>` 加载结果
     */
    pub fn load<T: DeserializeOwned>(&self, path: &str) -> Result<T, AppError> {
        println!("加载配置文件: {}", path);
        let file_content = fs::read_to_string(path)?;
        let config = serde_json::from_str(&file_content)?;
        Ok(config)
    }

    /**
     * 保存配置到指定文件
     * # 参数
     * * `config` 要保存的配置对象
     * * `filename` 配置文件名，默认为"app.json"
     * # 返回
     * * `Result<(), AppError>` 保存结果
     */
    pub fn save<T: Serialize>(&self, config: &T, filename: Option<&str>) -> Result<(), AppError> {
        let file_path = self.get_config_path(filename.unwrap_or("app.json"));
        println!("保存配置到: {}", file_path);
        
        let serialized_config = serde_json::to_string_pretty(config)?;
        fs::write(file_path, serialized_config)?;
        Ok(())
    }
}
