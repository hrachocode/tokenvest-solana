use reqwest::Client;
use std::error::Error;
use async_timers::{OneshotTimer, PeriodicTimer};
use tokio::time::Duration;

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {

    let url = "http://localhost:3000/api/contract/write";

    let json_body= r#"{
        "methodName": "showTime",
        "args": []
    }"#;

    let mut start_delay = OneshotTimer::expired();
    let mut periodic = PeriodicTimer::stopped();

    start_delay.schedule(Duration::from_secs(10));
    println!("Post request in 10 secs");

    loop {
        tokio::select! {
            _ = start_delay.tick() => {
                periodic.start(Duration::from_millis(500));
                let client = Client::new();
                let response = client
                    .post(url)
                    .header("Content-Type", "application/json")
                    .body(json_body)
                    .send()
                    .await?;
            
                let body = response.text().await?;
                println!("Response body: {}", body);

                Ok(())

            }
        }
    }
}
