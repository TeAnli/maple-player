// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
mod api;
mod util;

use api::request;
use tauri::Manager;
use util::http;

use tokio::sync::Mutex;

struct AppState {
    http_client: http::HttpClient,
    download_queue: http::DownloadQueue,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            app.manage(Mutex::new(AppState {
                http_client: http::HttpClient::new(),
                download_queue: http::DownloadQueue::new(),
            }));
            Ok(())
        })
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            request::login,
            request::search_bvid_info,
            request::scan_check,
            request::get_all_folder,
            request::get_user_data,
            request::get_cid_by_bvid,
            request::download,
            request::push_download_queue
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
