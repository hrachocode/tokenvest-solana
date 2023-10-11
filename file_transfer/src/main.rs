use std::fs;
use std::env;

fn main() {
    let path_json = "../solana_investment_contract/target/idl/investment_contract.json";
    let destination_json = "../frontend/investment_contract.json";
    let result_json = fs::copy(path_json, destination_json);

    match result_json {
        Ok(v) => println!("Copied {:?} bytes", v),
        Err(e) => println!("{:?}", e),
    }
}

