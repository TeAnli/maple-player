use std::collections::HashMap;

/**
 * 生成登陆二维码 GET请求
 */
pub const QRCODE_GENERATE_URL: &str =
    "https://passport.bilibili.com/x/passport-login/web/qrcode/generate";
/**
 * 实时的获取登陆状态 GET请求
 * 1. `qrcode_key` 参数
 */
pub const QRCODE_POLL_URL: &str = "https://passport.bilibili.com/x/passport-login/web/qrcode/poll";
/**
 * 获取用户信息 GET请求
 * 1. `up_mid` 参数
 */
pub const GET_USER_DATA_URL: &str = "https://api.bilibili.com/x/web-interface/nav";
/**
 * 获取用户所有收藏夹信息 GET请求
 * 1. `up_mid` 参数
 */
pub const GET_ALL_FOLDER_URL: &str = "https://api.bilibili.com/x/v3/fav/folder/created/list-all";
/**
 * 获取用户单个收藏夹信息 GET请求
 * 1. `media_id` 参数
 */
pub const GET_FOLDER_INFO_URL: &str = "https://api.bilibili.com/x/v3/fav/resource/list";
/**
 * 搜索视频 GET请求
 * 1. `keyword` 参数
 */
pub const SEARCH_BVID_INFO: &str = "https://api.bilibili.com/x/web-interface/view";
/**
 * 获取视频信息 GET请求
 * 1. `bvid` 参数
 */
pub const GET_VIDEO_INFO: &str = "https://api.bilibili.com/x/web-interface/view";
/**
 * 获取视频下载地址 GET请求
 * 1. `bvid` 参数
 * 2. `cid` 参数
 */
pub const GET_VIDEO_DOWNLOAD_URL: &str = "https://api.bilibili.com/x/player/playurl";

/**
 * 获取音乐区轮播图信息
 * 1. `region_id`: 分区参数
 */
pub const MUSIC_BANNER_URL: &str = "https://api.bilibili.com/x/web-show/region/banner";


pub struct URL {
    url: String,
    params: HashMap<String, String>,
}

impl URL {
    pub fn new(url: &str) -> Self {
        Self {
            url: url.to_string(),
            params: HashMap::new(),
        }
    }
    /**
     * 添加url参数
     */
    pub fn add_param(mut self, key: &str, value: &str) -> Self {
        self.params.insert(key.to_string(), value.to_string());
        self
    }
    /**
     * 构建http url链接
     */
    pub fn build(&self) -> String {
        let mut url = self.url.clone();
        if !self.params.is_empty() {
            let separator = if url.contains('?') { '&' } else { '?' };
            url.push(separator);
            let params: Vec<String> = self
                .params
                .iter()
                .map(|(name, value)| format!("{}={}", name, value))
                .collect();
            url.push_str(&params.join("&"));
        }
        url
    }
}
