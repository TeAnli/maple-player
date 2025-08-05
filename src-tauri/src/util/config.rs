use serde::{Deserialize, Serialize};

use crate::{error::AppError, util::config};

#[derive(Deserialize, Serialize)]
pub struct Config {
    pub id: String,

}
impl Config {
    pub fn new(id: String) -> Self {
        Self{
            id,
        }
    }
}


pub struct ConfigManager {
    pub configs: Vec<Config>,
}

impl ConfigManager {
    pub fn init() -> Self {
        let mut configs = Vec::new();
        configs.push(Config::new("user".to_string()));
        configs.push(Config::new("setting".to_string()));
        Self { configs }
    }
    // pub fn save_config(&mut self) -> Result<(), AppError> {
    //     for config in &self.configs {
    //         let json = serde_json::to_string(&config)?;
    //         let file_name = format!("{}.json", config.id);
    //         std::fs::write(file_name, json).map_err(|error| AppError::IO(error))?;
    //     }
    //     Ok(())
    // }
    // pub fn load_config() -> Result<Self, AppError> {
    //     let mut configs = Vec::new();
    //     let files = std::fs::read_dir("./").map_err(|error| AppError::IO(error))?;
    //     for file in files {
    //         let file = file.map_err(|error| AppError::IO(error))?;
    //         let file_name = file.file_name().into_string().map_err(|error| AppError::IO(error))?;
    //     }
    // }
}