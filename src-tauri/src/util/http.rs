use reqwest::{cookie::Jar, header, Client};
use serde::{Deserialize, Serialize};
use std::{collections::VecDeque, sync::Arc};
use reqwest::header::HeaderMap;
use crate::error::{AppError};

/**
 * 当前下载状态
 */
#[derive(PartialEq, Debug, Clone, Serialize, Deserialize)]
pub enum DownloadStatus {
    Pending,     /* 等待下载 */
    Paused,      /* 暂停下载 */
    Downloading, /* 下载中 */
    Finished,    /* 下载完成 */
    Failed,      /* 下载失败 */
}

/**
 * 下载队列，使用双向队列存储，提升性能
 */
#[derive(Default)]
pub struct DownloadQueue {
    pub queue: VecDeque<Task>,
}
impl DownloadQueue {
    pub fn new() -> Self {
        Self {
            queue: VecDeque::new(),
        }
    }
    pub fn enqueue(&mut self, item: Task) {
        self.queue.push_back(item);
    }
    pub fn is_empty(&self) -> bool {
        self.queue.is_empty()
    }
}
/**
 * 下载任务
 */
#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct Task {
    pub id: String,             /* 任务ID， 使用Bilibili视频号存储 */
    pub progress: Progress,     /* 当前进度 */
    pub status: DownloadStatus, /* 当前下载状态 */
    pub url: String,            /* 下载链接 */
}
impl Task {
    pub fn create(id: &String, url: &String) -> Self {
        Self {
            url: url.to_string(),
            id: id.to_string(),
            progress: Progress::default(),
            status: DownloadStatus::Pending,
        }
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
    /**
     * 取得当前进度比率
     */
    pub fn progress(&self) -> f64 {
        self.current_size as f64 / self.total_size as f64
    }
}
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
        HttpClient {
            client,
            cookie_jar,
        }
    }
    pub fn save(&self) {
        todo!("存储cookie")
    }
}

pub async fn send_get_request<T>(client: &Client, url: String) -> Result<T, AppError>
where
    T: serde::de::DeserializeOwned,
{

    let mut headers = HeaderMap::new();
    headers.insert(header::USER_AGENT, "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36".parse().unwrap());
    headers.insert(header::REFERER, "https://www.bilibili.com/".parse().unwrap());
    let response = client
        .get(url)
        .headers(headers)
        .send()
        .await
        .map_err(|error| AppError::HttpRequest(error))?;

    response.json().await.map_err(|error| AppError::HttpRequest(error))
}
