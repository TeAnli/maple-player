// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
mod api;
mod system;
mod util;

use api::request;
use system::window;
use util::http;

use tokio::sync::Mutex;

struct AppState {
    http_client: Mutex<http::HttpClient>,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .manage(AppState {
            http_client: Mutex::new(http::HttpClient::new()),
        })
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            window::create_window,
            request::login,
            request::search_bvid_info,
            request::scan_check,
            request::get_all_folder,
            request::get_user_data
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
