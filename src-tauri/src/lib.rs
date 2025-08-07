mod api;
mod commands;
mod error;
mod proxy_server;
mod util;

use std::thread;
use tauri_plugin_log::Target;
use tauri_plugin_log::TargetKind;
use tokio::sync::Mutex;
use util::config;
use util::http;

/**
 * 应用状态管理
 * 用于管理应用的全局状态，包括网络请求、下载队列、配置信息。
 * 所有的命令都需要通过这个状态来进行交互，确保数据的一致性。
 */
struct AppState {
    http_client: http::HttpClient,
    download_queue: http::DownloadQueue,
    config_manager: config::ConfigManager,
}
/**
 * 启动代理服务器,用于获取正确的音视频URL
 */
#[tauri::command]
async fn start_proxy_server() {}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        /* 注册插件 */
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_opener::init())
        /* 日志记录 */
        .plugin(
            tauri_plugin_log::Builder::new()
                .targets([
                    Target::new(TargetKind::Stdout),
                    Target::new(TargetKind::LogDir { file_name: None }),
                    Target::new(TargetKind::Webview),
                ])
                .build(),
        )
        .setup(|_| {
            /* 创建代理服务器线程 */
            thread::spawn(|| {
                proxy_server::main().expect("Failed to start proxy server");
            });
            Ok(())
        })
        /* 注册tauri API接口 */
        .invoke_handler(tauri::generate_handler![
            start_proxy_server,
            commands::request::login,
            commands::request::search_bvid_info,
            commands::request::scan_check,
            commands::request::get_all_folder,
            commands::request::get_user_data,
            commands::request::get_user_card,
            commands::request::get_cid_by_bvid,
            commands::request::download,
            commands::request::push_download_queue,
            commands::request::get_audio_url,
            commands::request::get_music_banners
        ])
        /* 状态管理 */
        .manage(Mutex::new(AppState {
            http_client: http::HttpClient::new(),
            download_queue: http::DownloadQueue::new(),
            config_manager: config::ConfigManager::init(),
        }))
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
