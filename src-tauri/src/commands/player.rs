use std::{sync::Arc, thread, time::Duration};

use tauri::{window, App, Emitter, State, Window};
use tokio::sync::Mutex;

use crate::{util::audio_player, AppState};

#[tauri::command]
pub async fn play_audio(
    state: State<'_, Mutex<AppState>>,
    window: Window,
    url: String,
    total_duration: u64,
) -> Result<(), String> {
    let audio = audio_player::NetworkAudio::create(
        url,
        &state.lock().await.http_client.client,
        total_duration,
    )
    .await
    .map_err(|e| e.to_string())?;

    state.lock().await.audio_player.play(audio).await?;

    Ok(())
}
#[tauri::command]
pub async fn pause_audio(state: State<'_, Mutex<AppState>>) -> Result<(), String> {
    state.lock().await.audio_player.pause().await?;
    Ok(())
}

#[tauri::command]
pub async fn seek_audio(state: State<'_, Mutex<AppState>>, duration: u64) -> Result<(), String> {
    state
        .lock()
        .await
        .audio_player
        .seek(Duration::from_secs(duration))
        .await?;
    Ok(())
}

#[tauri::command]
pub async fn recovery_audio(state: State<'_, Mutex<AppState>>) -> Result<(), String> {
    state.lock().await.audio_player.recovery().await?;
    Ok(())
}
#[tauri::command]
pub async fn get_duration(state: State<'_, Mutex<AppState>>, window: Window) -> Result<(), String> {
    let duration = state.lock().await.audio_player.get_current_duration().await.as_secs();
    window.emit("music_progress", duration).map_err(|e| e.to_string())?;
    if !*state.lock().await.audio_player.is_playing.lock().await {
        window.emit("music_progress", "not_playing").map_err(|e| e.to_string())?;
    }
    Ok(())
}