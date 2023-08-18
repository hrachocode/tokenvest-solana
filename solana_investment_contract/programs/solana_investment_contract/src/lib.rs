use anchor_lang::prelude::*;
//use anchor_lang::solana_program::*;

// This is your program's public key and it will update
// automatically when you build the project.
declare_id!("5daxCs5LvkZuU599JuRTWc1poexpkSwPU1hCPWQDQzmJ");

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
            ],
            &[],
        )?;

        investment_contract.investors.push(from_account.key());
        investment_contract.tokens_collected =
            investment_contract.tokens_collected + investment_amount;

        Ok(())
    }

    pub fn withdraw(ctx: Context<Withdraw>) -> Result<()> {
        let investment_contract = &mut ctx.accounts.investment_contract;
        let withdraw_amount = investment_contract.tokens_collected;
        let startup_owner = investment_contract.startup_owner;
        let caller = &ctx.accounts.caller;
        if caller.key == &startup_owner {
            use anchor_lang::system_program::{transfer, Transfer};

            let cpi_context = CpiContext::new_with_signer(
                ctx.accounts.system_program.to_account_info(),
                Transfer {
                    from: investment_contract.to_account_info(),
                    to: caller.clone().to_account_info(),
                },
            );

            transfer(cpi_context, withdraw_amount)?;

            Ok(())
        } else {
            msg!("wrong signer");
            Ok(())
        }
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = startup_owner, space = 8 + InvestmentContract::MAX_SIZE)]
    pub investment_contract: Account<'info, InvestmentContract>,
    #[account(mut)]
    pub startup_owner: Signer<'info>,
    pub system_program: Program<'info, System>,
    pub clock: Sysvar<'info, Clock>,
}

#[derive(Accounts)]
pub struct Invest<'info> {
    #[account(mut)]
    pub investment_contract: Account<'info, InvestmentContract>,
    #[account(mut)]
    pub from: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Withdraw<'info> {
    #[account(mut)]
    pub investment_contract: Account<'info, InvestmentContract>,
    #[account(mut)]
    pub caller: Signer<'info>,
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
    pub investors: Vec<Pubkey>,
}

impl InvestmentContract {
    const MAX_SIZE: usize = 1024;
}
