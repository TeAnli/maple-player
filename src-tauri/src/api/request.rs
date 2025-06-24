use crate::api::data;

#[tauri::command]
pub async fn search_bvid_info(bvid: std::sync::Mutex<String>) -> Result<data::VideoInfo, String> {
    let client = reqwest::Client::builder()
        .cookie_store(true)
        .user_agent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36")
        .build()
        .map_err(|e| e.to_string())?;

    let api: String = format!(
        "https://api.bilibili.com/x/web-interface/view?bvid={}",
        bvid.lock().map_err(|e| e.to_string())?
    );

    let response = client.get(api).send().await.map_err(|e| e.to_string())?;
    let video_info: data::VideoInfo = response.json().await.map_err(|e| e.to_string())?;
    
    Ok(video_info)
}

/// 获取bilibili热门歌单
#[tauri::command]
pub async fn get_hot_playlists(
    page: i32,
    page_size: i32,
) -> Result<data::PlaylistResponse, String> {
    let client = reqwest::Client::builder()
        .cookie_store(true)
        .build()
        .map_err(|e| e.to_string())?;
    let api_url = format!(
        "https://www.bilibili.com/audio/music-service-c/web/menu/hit?ps={}&pn={}",
        page_size, page
    );
    println!("{}",api_url);
    // 发送请求
    let response = client.get(api_url).send().await.map_err(|e| e.to_string())?;
    let music_info: data::PlaylistResponse = response.json().await.map_err(|e| e.to_string())?;
    println!("{:?}",music_info);
    Ok(music_info)
}
