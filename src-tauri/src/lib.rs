// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
mod api;
mod system;

use api::request;
use system::window;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            window::create_window,
            request::login,
            request::search_bvid_info,
            request::get_hot_playlists,
            request::scan_check
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
