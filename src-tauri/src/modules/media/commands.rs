use serde_json::Value;
use tauri::{State, Window};
use tokio::sync::Mutex;
use crate::AppState;
use crate::error::AppError;
use crate::modules::api::urls;
use crate::modules::api::urls::URL;
use crate::modules::media::download::Task;
use crate::util::http;

/**
 * 下载视频
 */
#[tauri::command]
pub async fn download(
    window: Window,
    state: State<'_, Mutex<AppState>>,
    bvid: String,
    cid: i64,
) -> Result<String, AppError> {
    let api_url = URL::new(urls::GET_VIDEO_DOWNLOAD_URL)
        .add_param("fnval", "4048")
        .add_param("bvid", &bvid)
        .add_param("cid", &cid.to_string())
        .add_param("fnver", "0")
        .add_param("fourk", "1")
        .build();
    //获取下载资源
    let response: Value =
        http::get_data(&state.lock().await.http_client.client, api_url).await?;
    println!("get resource");
    //获取文件下载路径
    let audio_url = response["data"]["dash"]["audio"][0]["baseUrl"]
        .as_str()
        .unwrap()
        .to_string();
    println!("get url");
    //创建任务
    let task = Task::create(bvid, audio_url);
    let client = &state.lock().await.http_client.client.clone();
    println!("hello world");
    let download_path = &state.lock().await.config_manager.get_config().download_path.clone();
    println!("hello sb");
    task.download(client, &window, download_path).await?;
    println!("start download");
    Ok(String::from(""))
}
