use crate::api::data::{BannerInfo, RecommandVideo, UserInfo, UserResponse};
use crate::api::urls::URL;
use crate::error::AppError;
use crate::util::download::Task;
use crate::util::http::{self};
use crate::util::wbi;
use crate::{
    api::{data, urls},
    AppState,
};
use reqwest::{Client};
use serde_json::Value;
use tauri::{State, Window};
use tokio::sync::Mutex;

/**
 * 通过bvid获取视频信息
 * * `bvid` 视频bvid
 */
#[tauri::command]
pub async fn search_bvid_info(
    state: State<'_, Mutex<AppState>>,
    bvid: String,
) -> Result<data::VideoData, AppError> {
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
) -> Result<i64, AppError> {
    let api_url = URL::new(urls::GET_VIDEO_INFO)
        .add_param("bvid", &bvid)
        .build();
    let video: data::CidResponse =
        http::send_get_request(&state.lock().await.http_client.client, api_url).await?;
    Ok(video.data.cid)
}

/**
 * 生成登陆二维码
 */
#[tauri::command]
pub async fn login(state: State<'_, Mutex<AppState>>) -> Result<data::LoginResponse, AppError> {
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
) -> Result<i64, AppError> {
    let api_url = URL::new(urls::QRCODE_POLL_URL)
        .add_param("qrcode_key", &qrcode_key)
        .build();
    let scan_info: data::ScanResponse =
        http::send_get_request(&state.lock().await.http_client.client, api_url).await?;
    Ok(scan_info.data.code)
}
/**
 * 获取轮播图
 */
#[tauri::command]
pub async fn get_music_banners(
    state: State<'_, Mutex<AppState>>,
) -> Result<Vec<BannerInfo>, AppError> {
    let api_url = URL::new(urls::MUSIC_BANNER_URL)
        .add_param("region_id", "1003")
        .build();

    let banner_response: Value =
        http::send_get_request(&state.lock().await.http_client.client, api_url).await?;

    let mut banner_list = Vec::new();
    if let Some(banners) = banner_response["data"]["region_banner_list"].as_array() {
        for banner in banners {
            let response: Value = http::send_get_request(
                &state.lock().await.http_client.client,
                format!(
                    "{}@.avg_color",
                    String::from(banner["image"].as_str().unwrap())
                ),
            )
            .await?;
            let info = BannerInfo {
                image: String::from(banner["image"].as_str().unwrap()),
                url: String::from(banner["url"].as_str().unwrap()),
                title: String::from(banner["title"].as_str().unwrap()),
                color: String::from(response["RGB"].as_str().unwrap()),
            };
            banner_list.push(info);
        }
    }
    Ok(banner_list)
}
/**
 * 获取所有文件夹
 * * `uid` 用户id
 */
#[tauri::command]
pub async fn get_all_folder(
    state: State<'_, Mutex<AppState>>,
    uid: i64,
) -> Result<Vec<data::PlaylistData>, AppError> {
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
) -> Result<data::PlaylistData, AppError> {
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
pub async fn get_user_data(state: State<'_, Mutex<AppState>>) -> Result<data::UserData, AppError> {
    let api_url = String::from(urls::GET_USER_NAV_URL);
    let response: Value =
        http::send_get_request(&state.lock().await.http_client.client, api_url).await?;

    let img_url = response["data"]["wbi_img"]["img_url"]
        .as_str()
        .unwrap()
        .to_string();
    let sub_url = response["data"]["wbi_img"]["sub_url"]
        .as_str()
        .unwrap()
        .to_string();

    let mid = response["data"]["mid"].as_i64().unwrap().to_string();

    let params = vec![("mid", mid)];
    let quary = wbi::encode_wbi(
        params,
        (
            wbi::take_filename(img_url).unwrap(),
            wbi::take_filename(sub_url).unwrap(),
        ),
    );
    let api_url = format!("{}?{quary}", urls::GET_USER_DATA_URL);
    println!("{api_url}");
    let info: UserResponse =
        http::send_get_request(&state.lock().await.http_client.client, api_url).await?;

    Ok(info.data)
}
/**
 * 获取用户信息
 */
#[tauri::command]
pub async fn get_user_card(
    state: State<'_, Mutex<AppState>>,
    mid: i64,
) -> Result<UserInfo, AppError> {
    let api_url = URL::new(urls::GET_USER_CARD_URL)
        .add_param("mid", &mid.to_string())
        .build();
    let response: Value =
        http::send_get_request(&state.lock().await.http_client.client, api_url).await?;
    let archive_count = response["data"]["archive_count"].as_i64().unwrap();
    let fans = response["data"]["card"]["fans"].as_i64().unwrap();
    let attention = response["data"]["card"]["attention"].as_i64().unwrap();
    Ok(UserInfo {
        fans,
        attention,
        archive_count,
    })
}
/**
 * 获取推荐歌曲
 */
#[tauri::command]
pub async fn get_recommand_video(
    state: State<'_, Mutex<AppState>>,
) -> Result<Vec<RecommandVideo>, AppError> {
    let api_url = URL::new(urls::GET_RECOMMAND_VIDEO_URL)
        .add_param("display_id", "1")
        .add_param("request_cnt", "3")
        .add_param("from_region", "1003")
        .add_param("device", "web")
        .build();
    let response: Value =
        http::send_get_request(&state.lock().await.http_client.client, api_url).await?;
    println!("{response}");
    let archives = response["data"]["archives"].as_array().unwrap();
    let archives_json = serde_json::Value::Array(archives.clone());
    let archives: Vec<data::RecommandVideo> =
        serde_json::from_value(archives_json).map_err(|e| AppError::from(e))?;
    Ok(archives)
}
#[tauri::command]
pub async fn get_audio_url(
    state: State<'_, Mutex<AppState>>,
    cid: i64,
    bvid: String,
) -> Result<String, AppError> {
    let api_url = URL::new(urls::GET_VIDEO_DOWNLOAD_URL)
        .add_param("fnval", "16")
        .add_param("bvid", &bvid)
        .add_param("cid", &cid.to_string())
        .add_param("fnver", "0")
        .add_param("fourk", "1")
        .build();
    let response: Value =
        http::send_get_request(&state.lock().await.http_client.client, api_url).await?;
    //获取文件下载路径
    let audio_url = response["data"]["dash"]["audio"][0]["baseUrl"]
        .as_str()
        .unwrap()
        .to_string();
    Ok(audio_url)
}

/**
 * 下载视频
 * * `bvid` 视频bvid
 * * `cid` 视频cid
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
        http::send_get_request(&state.lock().await.http_client.client, api_url).await?;
    println!("get resource");
    //获取文件下载路径
    let audio_url = response["data"]["dash"]["audio"][0]["baseUrl"]
        .as_str()
        .unwrap()
        .to_string();
    println!("get url");
    //创建任务
    let task = Task::create(bvid, audio_url);
    task.download(&state.lock().await.http_client.client, &window).await.unwrap();
    println!("start download");
    Ok(String::from(""))
}