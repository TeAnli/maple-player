mod api;
mod commands;
mod util;

use tauri::Manager;
use tauri_plugin_log::Target;
use tauri_plugin_log::TargetKind;
use tokio::sync::Mutex;
use util::audio_player;
use util::config;
use util::http;
/**
 * 应用状态管理
 * 用于管理应用的全局状态，包括网络请求、下载队列、配置信息和音频播放器。
 * 所有的命令都需要通过这个状态来进行交互，确保数据的一致性。
 */
struct AppState {
    http_client: http::HttpClient,
    download_queue: http::DownloadQueue,
    config: config::Config,
    audio_player: audio_player::AudioPlayer,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        // 状态管理
        .setup(|app| {
            app.manage(Mutex::new(AppState {
                http_client: http::HttpClient::new(),
                download_queue: http::DownloadQueue::new(),
                config: config::Config::new(),
                audio_player: audio_player::AudioPlayer::new(),
            }));
            Ok(())
        })
        // 注册插件
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_opener::init())
        .plugin(
            tauri_plugin_log::Builder::new()
                .targets([
                    Target::new(TargetKind::Stdout),
                    Target::new(TargetKind::LogDir { file_name: None }),
                    Target::new(TargetKind::Webview),
                ])
                .build(),
        )
        // 注册tauri API接口
        .invoke_handler(tauri::generate_handler![
            commands::request::login,
            commands::request::search_bvid_info,
            commands::request::scan_check,
            commands::request::get_all_folder,
            commands::request::get_user_data,
            commands::request::get_cid_by_bvid,
            commands::request::download,
            commands::request::push_download_queue,
            commands::request::get_audio_url,
            commands::request::verify_audio_url,
            commands::config::set_download_path,
            commands::config::get_config,
            commands::player::play_audio
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
