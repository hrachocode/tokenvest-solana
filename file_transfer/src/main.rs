use std::fs;
use std::path::Path;

fn main() {
    let path_json = "../investment_smart_contract/target/ink/investment_smart_contract.json";
    let destination_json = "../frontend/contracts/investment_smart_contract.json";
    let contract_wasm = "../investment_smart_contract/target/ink/investment_smart_contract.wasm";
    let destination_wasm = "../frontend/contracts/investment_smart_contract.wasm";
    let result_json = fs::copy(path_json, destination_json);

    match result_json {
        Ok(v) => println!("Copied {:?} bytes", v),
        Err(e) => println!("{:?}", e),
    }
    let result_wasm = fs::copy(contract_wasm, destination_wasm);

    match result_wasm {
        Ok(v) => println!("Copied {:?} bytes", v),
        Err(e) => println!("{:?}", e),
    }

}

