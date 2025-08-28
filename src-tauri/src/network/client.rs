use reqwest::cookie::Jar;
use reqwest::Client;
use tauri::Url;
use std::collections::HashMap;
use std::fs;
use std::sync::Arc;

use crate::error::AppError;

pub struct HttpClient {
    pub client: Client,
    pub cookie_jar: Arc<Jar>,
}

impl HttpClient {
    pub fn new() -> Self {
        let cookie_jar = Arc::new(Jar::default());
        let client = Client::builder()
            .cookie_store(true)
            .cookie_provider(cookie_jar.clone())
            .user_agent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36")
            .build()
            .expect("Failed to create http client");
        HttpClient { client, cookie_jar }
    }

    /**
     * 保存cookie到本地存储
     * 
     * 将cookie序列化为JSON并保存到应用配置目录
     */
    pub fn save_cookie(&self) -> Result<(), AppError> {
        // // 获取应用配置目录
        // let app_config_dir = ensure_app_config_dir("maple-player")?;
        // let cookie_path = format!("{}/cookies.json", app_config_dir.to_string_lossy());
        
        // // 将cookie_jar中的内容转换为可序列化的格式
        // // 由于reqwest的Jar没有直接提供导出所有cookie的方法
        // // 这里我们使用一个简单的HashMap来存储domain和cookie字符串的映射
        // let mut cookie_map: HashMap<String, Vec<String>> = HashMap::new();
        
        // // 常用的域名，可以根据实际使用的API扩展
        // let domains = vec!["bilibili.com", ".bilibili.com", "api.bilibili.com", "www.bilibili.com"];
        
        // for domain in domains {
        //     let url = format!("https://{}", domain);
        //     if let Ok(url) = Url::parse(&url) {
        //         if let Some(cookies) = self.cookie_jar.cookies(&url) {
        //             if let Some(cookie_str) = cookies.to_str().ok() {
        //                 if !cookie_str.is_empty() {
        //                     let cookies: Vec<String> = cookie_str.split(';')
        //                         .map(|s| s.trim().to_string())
        //                         .collect();
        //                     cookie_map.insert(domain.to_string(), cookies);
        //                 }
        //             }
        //         }
        //     }
        // }
        
        // // 序列化并保存
        // let serialized = serde_json::to_string_pretty(&cookie_map)?;
        // fs::write(cookie_path, serialized)?;
        // println!("Cookie已保存到本地");
        
        Ok(())
    }

    /**
     * 从本地存储加载cookie
     *
     * 从应用配置目录读取并反序列化cookie
     */
    pub fn load_cookie(&self) -> Result<(), AppError> {
        // 获取应用配置目录
        // let app_config_dir = ensure_app_config_dir("maple-player")?;
        // let cookie_path = format!("{}/cookies.json", app_config_dir.to_string_lossy());
        
        // // 检查cookie文件是否存在
        // if !std::path::Path::new(&cookie_path).exists() {
        //     println!("Cookie文件不存在，跳过加载");
        //     return Ok(());
        // }
        
        // // 读取并反序列化cookie
        // let file_content = fs::read_to_string(&cookie_path)?;
        // let cookie_map: HashMap<String, Vec<String>> = serde_json::from_str(&file_content)?;
        
        // // 将cookie添加到jar中
        // for (domain, cookies) in cookie_map {
        //     for cookie in cookies {
        //         let url = format!("https://{}", domain);
        //         if let Ok(url) = Url::parse(&url) {
        //             // 创建一个包含Set-Cookie头的HeaderMap
        //             let mut headers = HeaderMap::new();
        //             headers.insert(SET_COOKIE, HeaderValue::from_str(&cookie).unwrap_or_else(|_| {
        //                 println!("无效的cookie值: {}", cookie);
        //                 HeaderValue::from_static("")
        //             }));
                    
        //             // 将cookie添加到jar
        //             self.cookie_jar.extract_cookies(&url, &headers);
        //         }
        //     }
        // }
        
        // println!("已从本地加载Cookie");
        Ok(())
    }
}
