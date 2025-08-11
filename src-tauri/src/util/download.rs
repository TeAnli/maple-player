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
/**
 * 下载任务
 */
#[derive(Debug)]
pub struct Task {
    pub id: String,
    pub url: String,
}
impl Task {
    pub fn create(id: String, url: String) -> Self {
        Self { id, url }
    }
    pub async fn download(&self, client: &Client, window: &Window) -> Result<(), AppError> {
        println!("Start download");
        let response: reqwest::Response = http::send_get_data(&client, self.url.clone())
            .await
            .unwrap();

        if response.status().is_success() {
            let file_name = format!("{}.mp3", self.id.clone());
            let file_path = format!("D:/Users/10559/test-music/{file_name}");
            //获取文件大小
            let total_size = response.content_length().unwrap_or(0);
            let mut current_size = 0_u64;
            //获取文件字节流
            let mut stream = response.bytes_stream();
            //创建文件
            let mut file = std::fs::File::create(&file_path).unwrap();
            while let Some(chunk) = stream.next().await {
                //依据chunk的大小逐个写入到文件中
                let chunk = chunk.unwrap();
                file.write_all(&chunk).unwrap();
                current_size += chunk.len() as u64;
                let _ = window.emit(
                    "download_progress",
                    Data {
                        id: self.id.clone(),
                        progress: Progress::new(total_size, current_size),
                    },
                );
            }
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
