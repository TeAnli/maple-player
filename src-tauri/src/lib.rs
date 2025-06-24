// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
mod api;

use api::request;

#[tauri::command]
fn exit(window: tauri::Window) {
    window.close().unwrap();
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            exit,
            request::search_bvid_info,
            request::get_hot_playlists
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
