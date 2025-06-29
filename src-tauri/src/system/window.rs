use tauri::Runtime;

#[tauri::command]
pub async fn create_window<R: Runtime>(
    app: tauri::AppHandle<R>,
    title: String,
    url: String,
) -> Result<(), String> {
    tauri::WebviewWindowBuilder::new(&app, title, tauri::WebviewUrl::App(url.into()))
        .resizable(false)
        .maximizable(false)
        .inner_size(400.0, 400.0)
        .build()
        .unwrap();
    Ok(())
}
