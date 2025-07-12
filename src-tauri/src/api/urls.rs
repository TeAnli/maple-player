/**
 * 生成登陆二维码 GET请求
 */
pub const QRCODE_GENERATE_URL: &str ="https://passport.bilibili.com/x/passport-login/web/qrcode/generate";
/**
 * 实时的获取登陆状态 GET请求
 * 1. qrcode_key参数 
 */
pub const QRCODE_POLL_URL: &str = "https://passport.bilibili.com/x/passport-login/web/qrcode/poll";
/**
 * 获取用户信息 GET请求
 * 1. up_mid参数
 */
pub const GET_USER_DATA_URL: &str = "https://api.bilibili.com/x/web-interface/nav";
/**
 * 获取用户所有收藏夹信息 GET请求
 * 1. up_mid参数
 */
pub const GET_ALL_FOLDER_URL: &str = "https://api.bilibili.com/x/v3/fav/folder/created/list-all";
/**
 * 获取用户单个收藏夹信息 GET请求
 * 1. media_id参数
 */
pub const GET_FOLDER_INFO_URL: &str = "https://api.bilibili.com/x/v3/fav/resource/list";
/**
 * 搜索视频 GET请求
 * 1. keyword参数
 */
pub const SEARCH_BVID_INFO: &str = "https://api.bilibili.com/x/web-interface/view";
/**
 * 获取视频信息 GET请求
 * 1. bvid参数
 */
pub const GET_VEDIO_INFO: &str = "https://api.bilibili.com/x/web-interface/view";
/**
 * 获取视频下载地址 GET请求
 * 1. bvid参数
 * 2. cid参数
 */
pub const GET_VEDIO_DOWNLOAD_URL: &str = "https://api.bilibili.com/x/player/wbi/playurl";
