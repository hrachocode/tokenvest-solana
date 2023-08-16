use anchor_lang::prelude::*;
//use anchor_lang::solana_program::*;

// This is your program's public key and it will update
// automatically when you build the project.
declare_id!("DtGf45PrQ7PCx4eS1aWs8iVSXXqqfnEBg6er6GM9up8x");

#[program]
mod investment_contract {
    use super::*;
    pub fn initialize(
        ctx: Context<Initialize>,
        investment_goal: u64,
        share_percentage: u64,
        end_time: i64,
    ) -> Result<()> {
        let contract_storage = &mut ctx.accounts.investment_contract;
        let startup_owner = &mut ctx.accounts.startup_owner;
        contract_storage.startup_owner = *startup_owner.key;
        contract_storage.investment_goal = investment_goal;
        contract_storage.share_percentage = share_percentage;
        contract_storage.start_time = ctx.accounts.clock.unix_timestamp;
        contract_storage.end_time = end_time;
        msg!("start time is: {}!", contract_storage.start_time); // Message will show up in the tx logs
        Ok(())
    }

    pub fn invest(ctx: Context<Invest>, investment_amount: u64) -> Result<()> {
        let from_account = &ctx.accounts.from;
        let investment_contract = &mut ctx.accounts.investment_contract;
        let transfer_instruction = solana_program::system_instruction::transfer(
            from_account.key,
            &investment_contract.key(),
            investment_amount,
        );

        solana_program::program::invoke_signed(
            &transfer_instruction,
            &[
                from_account.to_account_info(),
                investment_contract.clone().to_account_info(),
                ctx.accounts.system_program.to_account_info(),
            ],
            &[],
        )?;

        investment_contract.investors.push(from_account.key());

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    // We must specify the space in order to initialize an account.
    // First 8 bytes are default account discriminator,
    // next 8 bytes come from NewAccount.data being type u64.
    // (u64 = 64 bits unsigned integer = 8 bytes)
    #[account(init, seeds=[startup_owner.key().as_ref()], bump, payer = startup_owner, space = 8 + 8)]
    pub investment_contract: Account<'info, InvestmentContract>,
    #[account(mut)]
    pub startup_owner: Signer<'info>,
    pub system_program: Program<'info, System>,
    pub clock: Sysvar<'info, Clock>,
}

#[derive(Accounts)]
pub struct Invest<'info> {
    #[account(mut)]
    pub from: Signer<'info>,
    #[account(mut)]
    pub investment_contract: Account<'info, InvestmentContract>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct InvestmentContract {
    pub startup_owner: Pubkey,
    pub start_time: i64,
    pub end_time: i64,
    pub tokens_collected: u64,
    pub investment_goal: u64,
    pub share_percentage: u64,
    pub investors: Vec<Pubkey>, // pub investors_list:
}
