use std::fs;
use std::env;

fn main() {
    let path_contract = "../investment_smart_contract/target/ink/investment_smart_contract.contract";
    let destination_contract = "../frontend/contract/investment_smart_contract.json";
    let result_contract = fs::copy(path_contract, destination_contract);

    match result_contract {
        Ok(v) => println!("Copied {:?} bytes", v),
        Err(e) => println!("{:?}", e),
    }
}

