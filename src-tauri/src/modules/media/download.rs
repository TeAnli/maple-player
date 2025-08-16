use std::io::Write;

use futures_util::StreamExt;
use reqwest::Client;
use serde::{Deserialize, Serialize};
use tauri::{Emitter, Window};

use crate::{error::AppError, util::http};

#[derive(Debug, Default, Serialize, Deserialize, Clone)]

pub struct Data {
    pub id: String,
    pub progress: Progress,
}

#[derive(Debug)]
pub struct Task {
    pub id: String,
    pub url: String,
}
impl Task {
    pub fn create(id: String, url: String) -> Self {
        Self { id, url }
    }
    /**
     * 下载文件
     */
    pub async fn download(&self, client: &Client, window: &Window, download_path: &str) -> Result<(), AppError> {
        println!("开始下载: {}", self.url);
        
        // 发送HTTP请求获取响应
        let response = http::get_response(&client, self.url.clone()).await?;

        if response.status().is_success() {
            let file_name = format!("{}.mp3", self.id.clone());
            let file_path = format!("{}/{file_name}", download_path);
            
            // 获取文件大小
            let total_size = response.content_length().unwrap_or(0);
            let mut current_size = 0_u64;
            
            // 获取文件字节流
            let mut stream = response.bytes_stream();
            
            // 创建文件
            let mut file = std::fs::File::create(&file_path)
                .map_err(|e| AppError::IO(e))?;
                
            // 处理文件流
            while let Some(chunk_result) = stream.next().await {
                let chunk = chunk_result.map_err(|e| AppError::HttpRequest(e))?;
                
                file.write_all(&chunk).map_err(|e| AppError::IO(e))?;
                
                current_size += chunk.len() as u64;
                
                // 发送进度事件
                window.emit(
                    "download_progress",
                    Data {
                        id: self.id.clone(),
                        progress: Progress::new(total_size, current_size),
                    },
                ).map_err(|error| AppError::Tauri(error))?;
            }
            
            println!("下载完成: {}", file_path);
        } else {
            println!("下载失败，HTTP状态码: {}", response.status());
            return Err(AppError::HttpStatus(response.status().as_u16()));
        }
        
        Ok(())
    }
}

#[derive(Debug, Default, Serialize, Deserialize, Clone)]
pub struct Progress {
    pub total_size: u64,
    pub current_size: u64,
}
impl Progress {
    pub fn new(total_size: u64, current_size: u64) -> Self {
        Self {
            total_size,
            current_size,
        }
    }
}
