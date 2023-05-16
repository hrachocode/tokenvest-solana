use std::fs;
use std::env;

fn main() {
    let path_contract = "../investment_smart_contract/target/ink/investment_smart_contract.contract";
    let destination_contract = "../frontend/contract/investment_smart_contract.json";
    /* To be added after finishing the node server 
    let metadata_contract = "../Substrate-Polkadot-Smart-Contracts-Caller/contractAPI/metadata.json";
    */
     let result_contract = fs::copy(path_contract, destination_contract);
     /* To be added after finishing the node server
    let result_contract_2 = fs::copy(path_contract, metadata_contract); 
    */


    match result_contract {
        Ok(v) => println!("Copied {:?} bytes", v),
        Err(e) => println!("{:?}", e),
    }



}

