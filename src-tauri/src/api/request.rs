use crate::api::data;
// By the bvid search Bilibili video info
#[tauri::command]
pub async fn search_bvid_info(bvid: std::sync::Mutex<String>) -> Result<data::VideoInfo, String> {
    let client = reqwest::Client::builder()
        .cookie_store(true)
        .user_agent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36")
        .build()
        .map_err(|e| e.to_string())?;

    let api_url: String = format!(
        "https://api.bilibili.com/x/web-interface/view?bvid={}",
        bvid.lock().map_err(|e| e.to_string())?
    );

    let response = client.get(api_url).send().await.map_err(|e| e.to_string())?;
    let video_info: data::VideoInfo = response.json().await.map_err(|e| e.to_string())?;
    
    Ok(video_info)
}

// Get The Bilibili hot playlists
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
    // Send the request
    let response = client.get(api_url).send().await.map_err(|e| e.to_string())?;
    let music_info: data::PlaylistResponse = response.json().await.map_err(|e| e.to_string())?;
    Ok(music_info)
}
#[tauri::command]
pub async fn login() -> Result<data::LoginResponse, String> {
    let client = reqwest::Client::builder()
        .cookie_store(true)
        .build()
        .map_err(|e|{e.to_string()})?;

    let api_url = String::from("https://passport.bilibili.com/x/passport-login/web/qrcode/generate");
    let response = client.get(api_url).send().await.map_err(|e|{e.to_string()})?;
    let login_info: data::LoginResponse = response.json().await.map_err(|e|{e.to_string()})?;
    Ok(login_info)
}
#[tauri::command]
pub async fn scan_check(qrcode_key: String) -> Result<i32, String> {
    let client = reqwest::Client::builder()
        .cookie_store(true)
        .build()
        .map_err(|e|{e.to_string()})?;
    println!("{}",qrcode_key);
    let api_url = format!("https://passport.bilibili.com/x/passport-login/web/qrcode/poll?qrcode_key={}",qrcode_key);
    let response = client.get(api_url).send().await.map_err(|e|{e.to_string()})?;
    let scan_info: data::ScanResponse = response.json().await.map_err(|e|{e.to_string()})?;
    println!("{:#?}",scan_info);
    
    if scan_info.data.code == 0 {
        Ok(1)
    }else {
        Ok(0)
    }
}