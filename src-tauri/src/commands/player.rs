use tauri::State;
use tokio::sync::Mutex;

use crate::{util::audio_player::Audio, AppState};

#[tauri::command]
pub async fn play_audio(state: State<'_, Mutex<AppState>>, url: String) -> Result<(), String> {
    let audio = Audio::create(url, &state.lock().await.http_client.client)
        .await
        .map_err(|e| e.to_string())?;

    state.lock().await.audio_player.add(audio);

    Ok(())
}
