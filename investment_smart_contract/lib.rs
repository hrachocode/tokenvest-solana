#![cfg_attr(not(feature = "std"), no_std)]

#[ink::contract]
mod investment_smart_contract {
    use ink::storage::Mapping;
    use ink_prelude::string::String;
    use ink_env::*;

    #[ink(storage)]
    pub struct InvestmentSmartContract {
        startup_owner: AccountId,
        startup_name: String,
        investors: Mapping<AccountId, Balance>,
        tokens_collected: Balance,
        investment_goal: u128,
    }

    impl InvestmentSmartContract {
        #[ink(constructor)]
        pub fn new(startup_owner: AccountId, investment_goal: u128, startup_name: String) -> Self {
            Self {
                startup_owner,
                startup_name,
                investors: Mapping::default(),
                tokens_collected: Balance::default(),
                investment_goal,
            }
        }

        #[ink(message, payable)]
        pub fn invest(&mut self) {
            let investment_amount = Self::env().transferred_value();
            if investment_amount == 0 {
                ink_env::debug_message("NO FUNDS ATTACHED")
            } else {
                let investor = Self::env().caller();
                self.investors.insert(investor, &investment_amount);
                self.tokens_collected += investment_amount;
            }
        }

        #[ink(message, payable)]
        pub fn withdraw(&mut self) {
            let caller = self.env().caller();
            if self.tokens_collected >= self.investment_goal || self.startup_owner == caller {
                let amount = self.tokens_collected;
                self.env().transfer(caller, amount).unwrap();
            } else {
                ink_env::debug_message("NOT ENOUGH FUNDS TO WITHDRAW");
            }
        }

        #[ink(message)]
        pub fn show_amount(&mut self) {
            ink_env::debug_println!("Amount is {}", self.tokens_collected);
        }
    }
}