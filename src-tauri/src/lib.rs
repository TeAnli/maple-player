mod modules;
mod error;
mod network;
mod util;

use std::thread;
use tauri_plugin_log::Target;
use tauri_plugin_log::TargetKind;
use tokio::sync::Mutex;
use std::env;
use crate::modules::{api, media, config};
use crate::modules::config::manager;
use crate::network::{client, proxy};

/**
 * 应用状态管理
 * 用于管理应用的全局状态，包括网络请求、配置信息。
 * 所有的命令都需要通过这个状态来进行交互，确保数据的一致性。
 */
struct AppState {
    http_client: client::HttpClient,
    config_manager: manager::ConfigManager,
}

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
                proxy::main().expect("Failed to start proxy server");
            });
            Ok(())
        })
        /* 注册tauri API接口 */
        .invoke_handler(tauri::generate_handler!(
            api::commands::login,
            api::commands::search_bvid_info,
            api::commands::scan_check,
            api::commands::get_all_folder,
            api::commands::get_user_data,
            api::commands::get_user_card,
            api::commands::get_cid_by_bvid,
            api::commands::get_audio_url,
            api::commands::get_music_banners,
            api::commands::get_recommand_video,
            media::commands::download,
            config::commands::save_app_config,
        ))
        /* 状态管理 */
        .manage(Mutex::new(AppState {
            http_client: client::HttpClient::new(),
            config_manager: manager::ConfigManager::init().expect("Failed to initialize config manager"),
        }))
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
