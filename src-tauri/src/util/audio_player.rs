use std::{io::Cursor, time::Duration};

use reqwest::Client;
use rodio::{Decoder, OutputStreamBuilder, Sink, Source};
use tokio::sync::mpsc;

pub enum Control {
    Play,
    Pause,
    Stop,
    NewAudio(Audio),
}
pub enum PlaybackMode {
    Single,
    Loop,
    Shuffle,
}
pub struct Audio {
    pub url: String,
    pub duration: u64,
    pub data: Vec<u8>,
}
impl Audio {
    pub async fn create(url: String, client: &Client) -> Result<Self, String> {
        // 添加请求头以模拟浏览器行为
        let response = client
            .get(&url)
            .header(
                reqwest::header::USER_AGENT,
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
            )
            .header(reqwest::header::ACCEPT, "*/*")
            .header("Referer", "https://www.bilibili.com")
            .send()
            .await
            .map_err(|e| format!("请求音频失败: {}", e))?;

        // 检查响应状态
        if !response.status().is_success() {
            return Err(format!("获取音频失败，状态码: {}", response.status()));
        }

        // 读取音频数据
        let data = response
            .bytes()
            .await
            .map_err(|e| format!("读取音频数据失败: {}", e))?;
        let data_vec = data.to_vec();

        let cursor = Cursor::new(data_vec.clone());

        // 尝试解码音频以获取时长
        let duration = match Decoder::new(cursor) {
            Ok(decoder) => decoder
                .total_duration()
                .unwrap_or(Duration::from_secs(0))
                .as_secs(),
            Err(_) => 0,
        };

        Ok(Self {
            url,
            duration,
            data: data_vec,
        })
    }
}
pub struct AudioPlayer {
    current_audio: Option<Audio>,
    queue: Vec<Audio>,
    playback_mode: PlaybackMode,
    control: Control,
    tx: Option<mpsc::Sender<Control>>,
    rx: Option<mpsc::Receiver<Control>>,
    volume: f32,
    is_playing: bool,
}
impl AudioPlayer {
    pub fn new() -> Self {
        let (tx, rx) = mpsc::channel(100);

        Self {
            current_audio: None,
            queue: Vec::new(),
            playback_mode: PlaybackMode::Single,
            control: Control::Stop,
            tx: Some(tx),
            rx: Some(rx),
            volume: 1.0,
            is_playing: false,
        }
    }
    pub fn init_playback_thread(&mut self) {
        // 转移接收端所有权到新线程
        let rx = self.rx.take().expect("接收端已被移动");
        let initial_volume = self.volume;

        // 创建新线程处理音频播放
        tokio::task::spawn(async move {
            // 初始化音频输出设备
            let stream_handler = OutputStreamBuilder::open_default_stream()
                .map_err(|e| e.to_string())
                .expect("创建音频输出流失败");
            let sink = Sink::connect_new(&stream_handler.mixer());

            // 设置初始音量
            sink.set_volume(initial_volume);

            // 播放循环

            // 确保音频流在线程结束前不被销毁
            drop(stream_handler);
        });
    }
    /**
     * 播放
     */
    // pub async fn play(&mut self) -> Result<bool, String> {
    // 确保播放线程已初始化
    // if self.tx.is_some() && self.rx.is_none() {
    //     // 如果当前没有音频且队列不为空，则从队列中获取
    //     if self.current_audio.is_none() && !self.queue.is_empty() {
    //         self.current_audio = Some(self.queue.remove(0));
    //     }

    //     // 发送播放命令
    //     if let Some(audio) = &self.current_audio {
    //         self.tx
    //             .as_ref()
    //             .ok_or("发送端已关闭".to_string())?
    //             .send(Control::NewAudio(audio.clone()))
    //             .await
    //             .map_err(|e| e.to_string())?;

    //         self.control = Control::Play;
    //         self.is_playing = true;
    //         return Ok(true);
    //     }
    // } else if self.rx.is_some() {
    //     self.init_playback_thread();
    //     return self.play().await;
    // }

    // Ok(false)
    // }

    pub fn add(&mut self, audio: Audio) {
        self.queue.push(audio);
    }
    pub fn get_control_state(&self) -> &Control {
        &self.control
    }

    pub fn get_current_audio(&self) -> Option<&Audio> {
        self.current_audio.as_ref()
    }
}

impl Clone for Audio {
    fn clone(&self) -> Self {
        Self {
            url: self.url.clone(),
            duration: self.duration,
            data: self.data.clone(),
        }
    }
}
