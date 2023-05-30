#![cfg_attr(not(feature = "std"), no_std)]

#[ink::contract]

mod investment_smart_contract {
    use ink;
    use ink::storage::Mapping;
    use ink_prelude::format;
    use ink_prelude::string::String;
    use ink_prelude::vec::Vec;

    #[ink(storage)]
    pub struct InvestmentSmartContract {
        nft_minter: AccountId,
        contract_owner: AccountId,
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

    fn pubkey_to_array(public_key: &str) -> [u8; 32] {
        let mut account_id_array = [0u8; 32]; // creates an array to store our account id
        let hex_chars = public_key.chars().skip(2); // skips the leading "0x"
        let mut i = 0; // Array index
        let mut chunk = String::new(); // empty byte chunk
        for hex_char in hex_chars {
            // Adds the byte chunks to the array
            chunk.push(hex_char);
            // checks if chunk's length is equal to 2
            if chunk.len() == 2 {
                //Parses the chunk string as a hexadecimal number and convert it to a byte
                let byte = u8::from_str_radix(&chunk, 16).unwrap_or(0);
                // Assigns the byte to the index in array
                account_id_array[i] = byte;
                // moves the index to the next one
                i += 1;
                // Clears the chunk string to parse it for the next two characters
                chunk.clear();
            }
        }
        account_id_array
    }

    impl InvestmentSmartContract {
        #[ink(constructor)]
        pub fn new(investment_goal: u128, share_percentage: u128, end_time: Timestamp) -> Self {
            // gets the AccountId for the owner of the startup campaign
            let startup_owner = Self::env().caller();
            let owner_pubkey = "0xe8ae424fac4f51e8011913ada8f2429a12ac20e2013288413335ee3ae3313649"; // our constant public key
            let nft_minter_pubkey = ""; // nft minter public key
            let account_id_array = pubkey_to_array(public_key);
            let contract_owner = AccountId::from(account_id_array);
            Self {
                nft_minter,
                contract_owner,
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
        pub fn withdraw_owner(&mut self, final_amount: u128) {
            let caller = self.env().caller();
            if self.tokens_collected >= self.investment_goal && self.startup_owner == caller {
                self.env().transfer(caller, final_amount).unwrap();
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
            } else {
                ink_env::debug_message("NOT ENOUGH FUNDS TO WITHDRAW");
            }
        }

        #[ink(message, payable)]
        pub fn withdraw_tokenvest(&mut self, commission: u128) {
            self.env()
                .transfer(self.contract_owner, commission)
                .unwrap();
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
                let investor_vec =
                    <ink::primitives::AccountId as AsRef<[u8; 32]>>::as_ref(investor);
                let investor_bytes: Vec<u8> = (*investor_vec).into();
                let mut investor_hex = String::new();
                for byte in investor_bytes.iter() {
                    investor_hex.push_str(&format!("{:02x}", byte));
                }
                let result = format!("0x{investor_hex}");
                ink_env::debug_println!(
                    "{:#?} , {:?}",
                    result,
                    self.investors_balances.get(investor).unwrap()
                );
                ink_env::debug_println!("{:#?}", self.investors);
            }
        }

        #[ink(message)]
        pub fn finish_startup(&mut self, commission: u128, final_amount: u128) {
            if self.end_time > Self::env().block_timestamp() {
                ink_env::debug_println!("CAMPAIGN SILL RUNNING");
            } else {
                if self.tokens_collected < self.investment_goal {
                    ink_env::debug_println!("CAMPAIGN FAILED");
                    for investor_account_id in self.investors.iter() {
                        let investor_refund_amount =
                            self.investors_balances.get(investor_account_id);
                        self.env()
                            .transfer(*investor_account_id, investor_refund_amount.unwrap())
                            .unwrap();
                    }
                } else {
                    self.withdraw_owner(final_amount);
                    self.withdraw_tokenvest(commission);
                }
            }
        }

        #[ink(message)]
        pub fn mint_and_transfer_nft(&mut self) {
            let call = ink::env::call::FromAccountId::from_account_id(flipper);
        }
    }
}
