use std::{io::Cursor, sync::Arc, time::Duration};

use reqwest::Client;
use rodio::{Decoder, OutputStream, OutputStreamBuilder, Sink};
use tokio::sync::{
    mpsc::{self, Sender},
    Mutex,
};

/**
 * 命令参数
 */
pub enum Command<T: Audio> {
    Play(T),
    Volume(f32),
    Seek(Duration),
    Stop,
    Pause,
    Recovery,
}

pub trait Audio {
    /**
     * 获取总时长
     */
    fn get_total_duration(&self) -> Duration;
}

pub struct NetworkAudio {
    url: String,
    duration: Duration,
    data: Cursor<Vec<u8>>,
}

impl NetworkAudio {
    /**
     * 创建NetworkAudio对象
     */
    pub async fn create(url: String, client: &Client, total_duration: u64) -> Result<Self, String> {
        /* 获取音频信息 */
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
            .map_err(|e| e.to_string())?;
        if !response.status().is_success() {
            return Err(format!("获取音频失败，状态码: {}", response.status()));
        }
        /* 获取音频数据 */
        let data = response.bytes().await.map_err(|e| e.to_string())?;
        /* 将音频数据转化为 Vec<u8> */
        let data_vec = data.to_vec();
        /* 获取音频数据Cursor */
        let cursor = Cursor::new(data_vec);
        /* 返回创建好的NetworkAudio对象 */
        Ok(Self {
            url,
            duration: Duration::from_secs(total_duration),
            data: cursor,
        })
    }
}

impl Audio for NetworkAudio {
    fn get_total_duration(&self) -> Duration {
        self.duration
    }
}

pub struct AudioPlayer {
    pub is_playing: Arc<Mutex<bool>>,
    /* rodio的sink播放器 */
    sink: Arc<Mutex<Sink>>,
    /* rodio默认流 */
    stream: OutputStream,
    /* 线程同步Sender */
    command_sender: Sender<Command<NetworkAudio>>,
}
impl AudioPlayer {
    pub fn new() -> Self {
        let stream = OutputStreamBuilder::open_default_stream().expect("open stream error");
        let sink = Arc::new(Mutex::new(Sink::connect_new(stream.mixer())));
        let is_playing = Arc::new(Mutex::new(false));
        let (command_sender, mut command_receiver) = mpsc::channel::<Command<NetworkAudio>>(100);

        let task_sink = Arc::clone(&sink);
        let task_playing = Arc::clone(&is_playing);
        tokio::task::spawn(async move {
            while let Some(command) = command_receiver.recv().await {
                let sink = task_sink.lock().await;
                let mut is_playing = task_playing.lock().await;
                match command {
                    Command::Pause => {
                        sink.pause();
                        *is_playing = false;
                    }
                    Command::Play(audio) => {
                        /* 通过解析，获取源音频数据 */
                        let source = Decoder::new(audio.data).unwrap();
                        /* 清理所有sink中存储的source */
                        sink.clear();
                        /* 添加源音频数据到sink中 */
                        sink.append(source);
                        /* 播放源音频数据 */
                        sink.play();

                        *is_playing = true;
                    }
                    Command::Volume(volume) => {
                        sink.set_volume(volume);
                    }
                    Command::Recovery => {
                        sink.play();
                        *is_playing = true;
                    }
                    Command::Stop => {
                        sink.stop();
                        *is_playing = false;
                    }
                    Command::Seek(duration) => {
                        let _ = sink.try_seek(duration);
                    }
                }
            }
        });

        Self {
            is_playing,
            sink,
            stream,
            command_sender,
        }
    }
    /**
     * 发送播放音频命令
     */
    pub async fn play(&self, audio: NetworkAudio) -> Result<String, String> {
        self.command_sender
            .send(Command::Play(audio))
            .await
            .map_err(|error| error.to_string())?;
        Ok("Successful to play audio".to_string())
    }
    /**
     * 发送暂停音频命令
     */
    pub async fn pause(&self) -> Result<String, String> {
        self.command_sender
            .send(Command::Pause)
            .await
            .map_err(|error| error.to_string())?;
        Ok("Successful to pause".to_string())
    }
    /**
     * 发送调整音频进度命令
     */
    pub async fn seek(&self, duration: Duration) -> Result<String, String> {
        self.command_sender
            .send(Command::Seek(duration))
            .await
            .map_err(|error| error.to_string())?;
        Ok("Successful to set current duration".to_string())
    }
    /**
     * 发送恢复播放音频命令
     */
    pub async fn recovery(&self) -> Result<String, String> {
        self.command_sender
            .send(Command::Recovery)
            .await
            .map_err(|error| error.to_string())?;
        Ok("Successful to set current duration".to_string())
    }
    /**
     * 获取当前播放音频的进度
     */
    pub async fn get_current_duration(&self) -> Duration {
        if !*self.is_playing.lock().await {
            return Duration::from_secs(0);
        }
        self.sink.lock().await.get_pos()
    }
}
