//登陆API

//无参数 GET请求
pub const QRCODE_GENERATE_URL: &str = "https://passport.bilibili.com/x/passport-login/web/qrcode/generate";
//需要qrcode_key参数 GET请求
pub const QRCODE_POLL_URL: &str = "https://passport.bilibili.com/x/passport-login/web/qrcode/poll";

//用户信息API
//需要用户up_mip参数  GET请求
pub const GET_ALL_FOLDER_URL: &str = "https://api.bilibili.com/x/v3/fav/folder/created/list-all";
//需要media_id和ps(每页数量)与pn(页码) GET请求 要求Cookie
pub const GET_FOLDER_INFO_URL: &str = "https://api.bilibili.com/x/v3/fav/resource/list";

pub const CREATE_FOLDER_URL: &str = "https://api.bilibili.com/x/v3/fav/folder/add";
pub const EDIT_FOLDER_URL: &str = "https://api.bilibili.com/x/v3/fav/folder/edit";
pub const DELETE_FOLDER_URL: &str = "https://api.bilibili.com/x/v3/fav/folder/del";

