// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
mod api;
mod system;

use tokio::sync::Mutex;

use api::request;
use system::window;

struct AppState {
    http_client: Mutex<request::HttpClient>,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .manage(AppState{
            http_client: Mutex::new(request::HttpClient::new())
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
