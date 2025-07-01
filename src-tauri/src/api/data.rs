use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct GenericResponse<T> {
    pub code: i64,
    pub message: String,
    pub data: T,
}
pub type VideoResponse = GenericResponse<VideoData>;
pub type PlaylistResponse = GenericResponse<PlaylistData>;
pub type ScanResponse = GenericResponse<ScanData>;
pub type FolderResponse = GenericResponse<FolderData>;
pub type UserResponse = GenericResponse<UserData>;
pub type LoginResponse = GenericResponse<LoginData>;

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
pub struct PlaylistData {
    info: PlaylistInfo,
    medias: Vec<PlaylistMeida>,
}
#[derive(Serialize, Deserialize, Debug, Default)]
pub struct PlaylistInfo {
    id: i64,
    fid: i64,
    mid: i64,
    attr: i64,
    title: String,
    cover: String,
    intro: String,
    media_count: i64,
}
#[derive(Serialize, Deserialize, Debug, Default)]
pub struct PlaylistMeida {
    id: i64,
    title: String,
    cover: String,
    duration: i64,
}
#[derive(Serialize, Deserialize, Debug, Default)]
pub struct LoginData {
    url: String,
    qrcode_key: String,
}

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct ScanData {
    pub refresh_token: String,
    pub timestamp: i64,
    pub code: i64,
}

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct FolderData {
    pub count: i64,
    pub list: Vec<FolderItem>,
}

#[derive(Serialize, Deserialize, Debug, Default, Clone)]
pub struct FolderItem {
    pub id: i64,
    pub fid: i64,
    pub mid: i64,
    pub attr: i64,
    pub title: String,
    pub media_count: i64,
}

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct FolderInfo {
    pub id: i64,
    pub fid: i64,
    pub mid: i64,
    pub attr: i64,
    pub title: String,
    pub media_count: i64,
    pub cover: String,
    pub intro: String,
}

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct UserData {
    pub mid: i64,
    pub face: String,
    pub uname: String,
}
