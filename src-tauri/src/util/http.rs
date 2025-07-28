use reqwest::{
    cookie::{CookieStore, Jar},
    header, Client, Url,
}; // 添加 Url 导入
use serde::{Deserialize, Serialize};
use std::{collections::VecDeque, sync::Arc};

#[derive(PartialEq, Debug, Clone, Serialize, Deserialize)]
pub enum DownloadStatus {
    Pending,
    Paused,
    Downloading,
    Finished,
    Failed,
}

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
#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct Task {
    pub id: String,
    pub progress: Progress,
    pub status: DownloadStatus,
    pub url: String,
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
    pub fn progress(&self) -> f64 {
        self.current_size as f64 / self.total_size as f64
    }
}
pub struct HttpClient {
    pub client: Client,
    pub cookie_jar: Arc<Jar>, // 添加 cookie_jar 字段
}

impl HttpClient {
    pub fn new() -> Self {
        let jar = Arc::new(Jar::default());
        let client = Client::builder()
            .cookie_store(true)
            .cookie_provider(jar.clone())
            .user_agent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36")
            .build()
            .expect("Failed to create http client");
        HttpClient {
            client,
            cookie_jar: jar,
        } // 存储 cookie_jar
    }
}

pub async fn send_get_request<T>(client: &Client, url: String) -> Result<T, String>
where
    T: serde::de::DeserializeOwned,
{
    let response = client
        .get(url)
        .header(header::USER_AGENT, "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36")
        .header(header::REFERER, "https://www.bilibili.com/")
        .send()
        .await
        .map_err(|e| e.to_string())?;
    response.json().await.map_err(|e| e.to_string())
}
