// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use reqwest::header::ACCEPT;
use reqwest::header::AUTHORIZATION;
use reqwest::Client;
use std::collections::HashMap;
use std::sync::LazyLock;

static CLIENT: LazyLock<Client> = LazyLock::new(|| Client::new());

#[tauri::command]
async fn post_request_github(
    url: String,
    query_params: HashMap<&str, &str>,
) -> Result<String, String> {
    let mut builder = CLIENT.post(&url).header(ACCEPT, "application/json");

    for (key, value) in &query_params {
        builder = builder.query(&[(key, value)]);
    }

    match builder.send().await {
        Ok(response) => {
            if response.status().is_success() {
                match response.text_with_charset("utf-8").await {
                    Ok(text) => Ok(text),
                    Err(err) => Err(format!("Failed to read response: {}", err)),
                }
            } else {
                Err(format!(
                    "API request failed with status: {}",
                    response.status()
                ))
            }
        }
        Err(err) => Err(format!("Request error: {}", err)),
    }
}


#[tauri::command]
async fn get_request_github(
    url: String,
    query_params: HashMap<&str, &str>,
    token: String
) -> Result<String, String> {
    let mut builder = CLIENT.get(&url).header(ACCEPT, "application/vnd.github+json")
        .header(AUTHORIZATION, "bearer ".to_owned() + &token);

    for (key, value) in &query_params {
        builder = builder.query(&[(key, value)]);
    }


    match builder.send().await {
        Ok(response) => {
            if response.status().is_success() {
                match response.text_with_charset("utf-8").await {
                    Ok(text) => Ok(text),
                    Err(err) => Err(format!("Failed to read response: {}", err)),
                }
            } else {
                Err(format!(
                    "API request failed with status: {}",
                    response.status()
                ))
            }
        }
        Err(err) => Err(format!("Request error: {}", err)),
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![post_request_github, get_request_github])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
