use reqwest::cookie::Jar;
use reqwest::Client;
use std::sync::Arc;

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
     * TODO: 实现cookie的持久化存储功能
     */
    pub fn save_cookie(&self) {
        
    }

    /**
     * 从本地存储加载cookie
     *
     * TODO: 实现从持久化存储加载cookie的功能
     */
    pub fn load_cookie() {}
}
