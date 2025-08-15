use thiserror::Error;
use reqwest::Error as ReqwestError;
use std::io::Error as IOError;
use hyper::Error as HyperError;
use serde_json::Error as JSONError;
use tauri::Error as TauriError;
/**
 * 异常处理
 */
#[derive(Error, Debug)]
pub enum AppError {
    #[error("HTTP request failed")]
    HttpRequest(#[from] ReqwestError),
    #[error("HTTP request status visit failed: {0}")]
    HttpStatus(u16),
    #[error("IO operation failed")]
    IO(#[from] IOError),
    #[error("Hyper proxy server request failed")]
    ProxyServerRequest(#[from] HyperError),
    #[error("JSON shifted failed")]
    JSON(#[from] JSONError),
    #[error("Tauri application ipc failed")]
    Tauri(#[from] TauriError)
}
impl serde::Serialize for AppError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::ser::Serializer,
    {
        serializer.serialize_str(self.to_string().as_ref())
    }
}
