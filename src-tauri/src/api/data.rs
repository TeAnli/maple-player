use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct VideoInfo {
    code: i32,
    data: VideoData,
}

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct VideoData {
    bvid: String,
    aid: i64,
    title: String,
    owner: VideoOwner,
    stat: VideoStat,
    pic: String,
}

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct VideoOwner {
    name: String,
    mid: i64,
}

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct VideoStat {
    view: i64,
    danmaku: i64,
    like: i64,
    coin: i64,
    favorite: i64,
}

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct PlaylistResponse {
    code: i32,
    data: PlaylistData,
}

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct PlaylistData {
    data: Vec<PlaylistItem>,
}

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct PlaylistItem {
    uid: i64,
    uname: String,
    title: String,
    cover: String,
    intro: String,
    ctime: i64,
    curtime: i64,
    statistic: PlaylistStatistic,
    snum: i64,
}

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct PlaylistStatistic {
    sid: i64,
    play: i64,
    collect: i64,
    comment: i64,
    share: i64,
}

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct LoginResponse {
    data: LoginData,
}
#[derive(Serialize, Deserialize, Debug, Default)]
pub struct LoginData {
    url: String,
    qrcode_key: String,
}

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct ScanResponse {
    pub code: i32,
    pub data: ScanData,
}

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct ScanData {
    pub refresh_token: String,
    pub timestamp: i64,
    pub code: i32,
    pub message: String,
}

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct FolderResponse {
    pub code: i32,
    pub message: String,
    pub data: FolderData,
}
#[derive(Serialize, Deserialize, Debug, Default)]
pub struct FolderData {
    pub count: i32,
    pub list: Vec<FolderItem>,
}
#[derive(Serialize, Deserialize, Debug, Default)]
pub struct FolderItem {
    pub id: i32,
    pub mid: i32,
    pub attr: i32,
    pub title: String,
    pub media_count: i32,
}
#[derive(Serialize, Deserialize, Debug, Default)]
pub struct CreateFolderResponse {
    pub code: i32,
    pub data: FolderItem
}
