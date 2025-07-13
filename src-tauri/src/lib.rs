// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
mod api;
mod commands;
mod util;

use util::config;
use tauri::Manager;
use tokio::sync::Mutex;
use util::http;

struct AppState {
    http_client: http::HttpClient,
    download_queue: http::DownloadQueue,
    config: config::Config,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .setup(|app| {
            app.manage(Mutex::new(AppState {
                http_client: http::HttpClient::new(),
                download_queue: http::DownloadQueue::new(),
                config: config::Config::new(),
            }));
            Ok(())
        })
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            commands::request::login,
            commands::request::search_bvid_info,
            commands::request::scan_check,
            commands::request::get_all_folder,
            commands::request::get_user_data,
            commands::request::get_cid_by_bvid,
            commands::request::download,
            commands::request::push_download_queue,
            commands::config::set_download_path,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
