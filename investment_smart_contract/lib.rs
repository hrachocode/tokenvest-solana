#![cfg_attr(not(feature = "std"), no_std)]

#[ink::contract]
mod investment_smart_contract {
    use ink;
    use ink::storage::Mapping;
    use ink_env;
    use ink_prelude::string::String;
    use ink_prelude::vec::Vec;
    use ink_prelude::format;

    #[ink(storage)]
    pub struct InvestmentSmartContract {
        startup_owner: AccountId,
        investors_balances: Mapping<AccountId, Balance>,
        investors_percentages: Mapping<AccountId, u128>,
        start_time: Timestamp,
        end_time: Timestamp,
        tokens_collected: Balance,
        investment_goal: u128,
        share_percentage: u128,
        investors: Vec<AccountId>,
    }

    impl InvestmentSmartContract {
        #[ink(constructor)]
        pub fn new(investment_goal: u128, share_percentage: u128, end_time: Timestamp) -> Self {
            let startup_owner = Self::env().caller();
            Self {
                startup_owner,
                investors_balances: Mapping::default(),
                investors_percentages: Mapping::default(),
                start_time: Self::env().block_timestamp(),
                end_time,
                tokens_collected: Balance::default(),
                investment_goal,
                share_percentage,
                investors: Vec::default(),

            }
        }

        #[ink(message, payable)]
        pub fn invest(&mut self) {
            let investment_amount = Self::env().transferred_value();
            if investment_amount == 0 {
                ink_env::debug_message("NO FUNDS ATTACHED")
            } else {
                let investor = Self::env().caller();
                self.investors.push(investor);
                self.investors_balances.insert(investor, &investment_amount);
                self.tokens_collected += investment_amount;
            }
        }

        #[ink(message, payable)]
        pub fn withdraw_owner(&mut self) {
            let caller = self.env().caller();
            if self.tokens_collected >= self.investment_goal && self.startup_owner == caller {
                let amount = self.tokens_collected;
                self.env().transfer(caller, amount).unwrap();
            } else {
                ink_env::debug_message("NOT ENOUGH FUNDS TO WITHDRAW");
            }
        } 

       #[ink(message, payable)]  
        pub fn withdraw_investor(&mut self) {
            let caller = self.env().caller();
            if self.tokens_collected >= self.investment_goal {
                let amount = self.investors_balances.get(caller).unwrap();     
                self.env().transfer(caller, amount).unwrap();  
            }
            else {
                ink_env::debug_message("NOT ENOUGH FUNDS TO WITHDRAW");
            }
        } 

        #[ink(message)]
        pub fn show_amount(&mut self) {
           ink_env::debug_println!("{}", self.tokens_collected);
        }

        #[ink(message)]
        pub fn show_time(&mut self) {
            ink_env::debug_println!("{}", self.start_time);
        }

        #[ink(message)]
        pub fn show_investors(&mut self) {
            for investor in self.investors.iter() {
            let investor_vec = <ink::primitives::AccountId as AsRef<[u8; 32]>>::as_ref(investor);
            let investor_bytes:Vec<u8> = (*investor_vec).into();
            let mut investor_hex = String::new();
            for byte in investor_bytes.iter() {
            investor_hex.push_str(&format!("{:02x}", byte));
            }
            let result = format!("0x{investor_hex}");
            ink_env::debug_println!("{:#?} , {:?}", result, self.investors_balances.get(investor).unwrap());
        }
    }

   #[ink(message)]
   pub fn finish_startup(&mut self) {
     if self.tokens_collected < self.investment_goal   {
        ink_env::debug_println!("CAMPAIGN FAILED");
        for investorAccountId in self.investors.iter() {
            let investor_refund_amount = self.investors_balances.get(investorAccountId);
            self.env().transfer(*investorAccountId, investor_refund_amount.unwrap()).unwrap();
        }
    }
        else {
            if self.end_time > Self::env().block_timestamp() {
                ink_env::debug_println!("CAMPAIGN SILL RUNNING");
            }
            else {
             self.withdraw_owner();
            }
     }
   }
}
}

