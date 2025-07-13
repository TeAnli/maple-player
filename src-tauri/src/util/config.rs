pub struct User {
    pub name: String,
    pub uid: i64,
    pub client_config: Config,
}
pub struct Config {
    pub download_path: String,
}

impl Config {
    pub fn new() -> Self {
        Self {
            download_path: String::from("C://Users/Administrator/AppData/Local/MaplePlayer"),
        }
    }
}
