#![cfg_attr(not(feature = "std"), no_std)]

#[ink::contract]
mod investment_smart_contract {
    use ink::storage::Mapping;
    use ink_prelude::string::String;

    #[ink(storage)]
    pub struct InvestmentSmartContract {
        // Name of the startup
        startup_name: String,
        // HashMap with investors and the amount invested
        investors: Mapping<AccountId, Balance>,
        // Vault where the xrd payments will be stored.
        tokens_collected: Balance,
        // Investment goal for the startup
        investment_goal: u128,
    }

    impl InvestmentSmartContract {
        #[ink(constructor)]
        pub fn new(investment_goal: u128, startup_name: String) -> Self {
            Self {
                startup_name: startup_name,
                investors: Mapping::default(),
                tokens_collected: Balance::default(),
                investment_goal: investment_goal,
            }
        }

        #[ink(message, payable)]
        pub fn invest(&mut self, investment_amount: Balance) {
            let investor = Self::env().caller();
            self.investors.insert(investor, &investment_amount);
            self.tokens_collected += Self::env().transferred_value();
        }

        #[ink(message, payable)]
        pub fn withdraw(&mut self) {
            if self.tokens_collected >= self.investment_goal {
                let caller = self.env().caller();
                let amount = self.tokens_collected;
                self.env().transfer(caller, amount).unwrap();
            } else {
                panic!("NOT ENOUGH FUNDS TO WITHDRAW");
            }
        }
    }
}