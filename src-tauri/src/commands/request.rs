use crate::api::urls::URL;
use crate::util::http::{self, Task};
use crate::{
    api::{data, urls},
    AppState,
};
use futures_util::StreamExt;
use reqwest::{header, Client};
use serde_json::Value;
use std::io::Write;
use tauri::Emitter;
use tauri::State;
use tokio::sync::Mutex;

/**
 * 通过bvid获取视频信息
 * * `bvid` 视频bvid
 */
#[tauri::command]
pub async fn search_bvid_info(
    state: State<'_, Mutex<AppState>>,
    bvid: String,
) -> Result<data::VideoData, String> {
    let api_url = URL::new(urls::SEARCH_BVID_INFO)
        .add_param("bvid", &bvid)
        .build();
    let video_info: data::VideoResponse =
        http::send_get_request(&state.lock().await.http_client.client, api_url).await?;
    Ok(video_info.data)
}
/**
 * 通过bvid获取视频cid
 * * `bvid` 视频bvid
 */
#[tauri::command]
pub async fn get_cid_by_bvid(
    state: State<'_, Mutex<AppState>>,
    bvid: String,
) -> Result<i64, String> {
    let api_url = URL::new(urls::GET_VEDIO_INFO)
        .add_param("bvid", &bvid)
        .build();
    let vedio: data::CidResponse =
        http::send_get_request(&state.lock().await.http_client.client, api_url).await?;
    Ok(vedio.data.cid)
}
/**
 * 生成登陆二维码
 */

#[tauri::command]
pub async fn login(state: State<'_, Mutex<AppState>>) -> Result<data::LoginResponse, String> {
    let api_url = String::from(urls::QRCODE_GENERATE_URL);
    let login_info: data::LoginResponse =
        http::send_get_request(&state.lock().await.http_client.client, api_url).await?;
    Ok(login_info)
}
/**
 * 轮询登陆状态
 * * `qrcode_key` 二维码key
 */
#[tauri::command]
pub async fn scan_check(
    state: State<'_, Mutex<AppState>>,
    qrcode_key: String,
) -> Result<i64, String> {
    let api_url = URL::new(urls::QRCODE_POLL_URL)
        .add_param("qrcode_key", &qrcode_key)
        .build();
    let scan_info: data::ScanResponse =
        http::send_get_request(&state.lock().await.http_client.client, api_url).await?;
    Ok(scan_info.data.code)
}
/**
 * 获取所有文件夹
 * * `uid` 用户id
 */
#[tauri::command]
pub async fn get_all_folder(
    state: State<'_, Mutex<AppState>>,
    uid: i64,
) -> Result<Vec<data::PlaylistData>, String> {
    let api_url = URL::new(urls::GET_ALL_FOLDER_URL)
        .add_param("up_mid", &uid.to_string())
        .build();
    let folder_info: data::FolderResponse =
        http::send_get_request(&state.lock().await.http_client.client, api_url).await?;
    let mut folder_list: Vec<data::PlaylistData> = Vec::new();
    for folder in folder_info.data.list {
        let playlist = get_folder_info(&state.lock().await.http_client.client, folder.id).await?;
        folder_list.push(playlist);
    }

    Ok(folder_list)
}
/**
 * 获取文件夹信息
 * * `folder_id` 文件夹id
 */
pub async fn get_folder_info(
    client: &Client,
    folder_id: i64,
) -> Result<data::PlaylistData, String> {
    let api_url = URL::new(urls::GET_FOLDER_INFO_URL)
        .add_param("media_id", &folder_id.to_string())
        .add_param("ps", "20")
        .build();
    let playlist_info: data::PlaylistResponse = http::send_get_request(client, api_url).await?;

    Ok(playlist_info.data)
}
/**
 * 获取用户信息
 */
#[tauri::command]
pub async fn get_user_data(state: State<'_, Mutex<AppState>>) -> Result<data::UserData, String> {
    let api_url = String::from(urls::GET_USER_DATA_URL);
    let info: data::UserResponse =
        http::send_get_request(&state.lock().await.http_client.client, api_url).await?;
    Ok(info.data)
}
/**
 * 下载视频
 * * `bvid` 视频bvid
 * * `cid` 视频cid
 */
#[tauri::command]
pub async fn push_download_queue(
    state: State<'_, Mutex<AppState>>,
    bvid: String,
    cid: i64,
) -> Result<String, String> {
    let api_url = URL::new(urls::GET_VEDIO_DOWNLOAD_URL)
        .add_param("fnval", "4048")
        .add_param("bvid", &bvid)
        .add_param("cid", &cid.to_string())
        .add_param("fnver", "0")
        .add_param("fourk", "1")
        .build();
    //获取下载资源
    let response = state.lock().await.http_client.client.get(api_url)
        .header(header::USER_AGENT, "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36")
        .header(header::REFERER, "https://www.bilibili.com/")
        .send()
        .await.map_err(|e| e.to_string())?;
    let json: Value = response.json().await.map_err(|e| e.to_string())?;
    //获取文件下载路径
    let audio_url = json["data"]["dash"]["audio"][0]["baseUrl"]
        .as_str()
        .unwrap()
        .to_string();
    //创建任务
    let task = Task::create(&bvid, &audio_url);
    println!("正在添加至队列中: {:#?}", task);
    //添加到下载队列中
    state.lock().await.download_queue.enqueue(task);
    Ok(String::from("成功添加至下载队列"))
}
/**
 * 下载视频
 */
#[tauri::command]
pub async fn download(
    state: State<'_, Mutex<AppState>>,
    window: tauri::Window,
) -> Result<String, String> {
    if state.lock().await.download_queue.is_empty() {
        return Ok(String::from("下载队列为空"));
    }

    std::fs::create_dir_all(&state.lock().await.config.download_path).unwrap();
    let mut is_empty = false;
    while !is_empty {
        println!("start loop");
        state
            .lock()
            .await
            .download_queue
            .queue
            .front_mut()
            .unwrap()
            .status = http::DownloadStatus::Downloading;
        println!("设置成下载中...");
        //下载文件
        let url = state
            .lock()
            .await
            .download_queue
            .queue
            .front_mut()
            .unwrap()
            .url
            .clone();
        let response = state.lock().await.http_client.client
                .get(url)
                .header(header::USER_AGENT, "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36")
                .header(header::REFERER, "https://www.bilibili.com/")
                .send()
                .await.map_err(|e| e.to_string())?;
        println!("执行下载任务");
        //如果文件存在 就执行下载任务
        if response.status().is_success() {
            // 生成唯一文件名
            let file_name = format!(
                "{}.mp3",
                state
                    .lock()
                    .await
                    .download_queue
                    .queue
                    .front_mut()
                    .unwrap()
                    .id
            );
            let file_path = format!("{}/{file_name}", &state.lock().await.config.download_path);
            //获取文件大小
            let total_size = response.content_length().unwrap_or(0);
            let mut current_size = 0_u64;
            //获取文件字节流
            let mut stream = response.bytes_stream();
            //创建文件
            let mut file = std::fs::File::create(&file_path).unwrap();
            //设置task的Progress的总大小
            state
                .lock()
                .await
                .download_queue
                .queue
                .front_mut()
                .unwrap()
                .progress
                .total_size = total_size;

            while let Some(chunk) = stream.next().await {
                //依据chunk的大小逐个写入到文件中
                let chunk = chunk.unwrap();
                file.write_all(&chunk).unwrap();
                current_size += chunk.len() as u64;
                state
                    .lock()
                    .await
                    .download_queue
                    .queue
                    .front_mut()
                    .unwrap()
                    .progress
                    .current_size = current_size;
                let queue = state.lock().await.download_queue.queue.clone();
                let result = Vec::from(queue);
                window
                    .emit("download_progress", result)
                    .map_err(|e: tauri::Error| e.to_string())?;
            }
            state.lock().await.download_queue.queue.pop_front();
            if state.lock().await.download_queue.is_empty() {
                is_empty = true;
                println!("sb");
            }
        }
    }

    let queue = state.lock().await.download_queue.queue.clone();

    let result = Vec::from(queue);
    println!("下载完成, 队列是否为空: {}", result.is_empty());
    window
        .emit("download_progress", result)
        .map_err(|e: tauri::Error| e.to_string())?;
    Ok(String::from("success"))
}
#[tauri::command]
pub async fn get_audio_url(
    state: State<'_, Mutex<AppState>>,
    cid: i64,
    bvid: String,
) -> Result<String, String> {
    let api_url = URL::new(urls::GET_VEDIO_DOWNLOAD_URL)
        .add_param("fnval", "16")
        .add_param("bvid", &bvid)
        .add_param("cid", &cid.to_string())
        .build();
    //获取下载资源
    let response = state.lock().await.http_client.client.get(api_url)
        .header(header::USER_AGENT, "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36")
        .header(header::REFERER, "https://www.bilibili.com/")
        .send()
        .await.map_err(|e| e.to_string())?;
    let json: Value = response.json().await.map_err(|e| e.to_string())?;
    //获取文件下载路径
    let audio_url = json["data"]["dash"]["audio"][0]["base_url"]
        .as_str()
        .unwrap()
        .to_string();
    Ok(audio_url)
}

#[tauri::command]
pub async fn verify_audio_url(state: State<'_, Mutex<AppState>>, url: &str) -> Result<(), String> {
    let response = state
        .lock()
        .await
        .http_client
        .client
        .get(url)
        .header(
            header::USER_AGENT,
            "Mozilla/5.0 BiliDroid/..* (bbcallen@gmail.com)",
        )
        .header(header::ACCEPT, "*/*")
        .header(header::RANGE, "bytes=0-1024")
        .header("Referer", "https://www.bilibili.com")
        .send()
        .await
        .map_err(|e| e.to_string())?;
    Ok(())
}
#[tauri::command]
async fn play_audio(state: State<'_, Mutex<AppState>>, url: String) -> Result<(), String> {
    let response = http::send_get_request(&state.lock().await.http_client.client, url)
        .await
        .map_err(|e| e.to_string())?;
    Ok(())
}
