use anchor_lang::prelude::*;

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
        contract_storage.bump = *ctx.bumps.get("investment_contract").unwrap();
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
        investment_contract
            .investors_list
            .push((from_account.key(), investment_amount as u64));
        investment_contract.tokens_collected =
            investment_contract.tokens_collected + investment_amount;

        Ok(())
    }
    pub fn withdraw(ctx: Context<Withdraw>) -> Result<()> {
        let investment_contract = &mut ctx.accounts.investment_contract;
        let withdraw_amount = investment_contract.tokens_collected;
        let caller = &ctx.accounts.caller;
        let startup_owner = investment_contract.startup_owner;
        if caller.key == &startup_owner {
            **ctx
                .accounts
                .investment_contract
                .to_account_info()
                .try_borrow_mut_lamports()? -= withdraw_amount;
            **ctx
                .accounts
                .caller
                .to_account_info()
                .try_borrow_mut_lamports()? += withdraw_amount;
            Ok(())
        } else {
            msg!("Unknown Caller: Cannot Withdraw Funds");
            Ok(())
        }
    }

    pub fn finish_startup(ctx: Context<FinishStartup>) -> Result<()> {
        let investment_contract = &ctx.accounts.investment_contract;
        let startup_owner = investment_contract.startup_owner;
        let caller = &ctx.accounts.caller;
        if investment_contract.end_time > ctx.accounts.clock.unix_timestamp {
            msg!("CAMPAIGN STILL RUNNING");
            Ok(())
        } else {
            if investment_contract.tokens_collected < investment_contract.investment_goal {
                msg!("CAMPAIGN FAILED");
                Ok(())
            } else {
                if caller.key == &startup_owner {
                    **ctx
                        .accounts
                        .investment_contract
                        .to_account_info()
                        .try_borrow_mut_lamports()? -= investment_contract.tokens_collected;
                    **ctx
                        .accounts
                        .caller
                        .to_account_info()
                        .try_borrow_mut_lamports()? += investment_contract.tokens_collected;
                    Ok(())
                } else {
                    msg!("Unknown Caller: Cannot Withdraw Funds");
                    Ok(())
                }
            }
        }
    }

    pub fn refund_startup(ctx: Context<RefundStartup>) -> Result<()> {
        let investment_contract = &ctx.accounts.investment_contract;
        let caller = &ctx.accounts.caller;
        if investment_contract.end_time > ctx.accounts.clock.unix_timestamp {
            msg!("CAMPAIGN STILL RUNNING");
            Ok(())
        } else {
            if investment_contract.tokens_collected > investment_contract.investment_goal {
                msg!("CAMPAING FINISHED SUCCESFULLY");
                Ok(())
            } else {
                if investment_contract.investors.contains(&caller.key) {
                    let refund_amount = investment_contract.investors_list.iter().find_map(|&(ref key, value)| {
                        if &key == &caller.key {
                            Some(value)
                        } else {
                            None
                        }
                });
                    **ctx
                        .accounts
                        .investment_contract
                        .to_account_info()
                        .try_borrow_mut_lamports()? -= refund_amount.unwrap();
                    **ctx
                        .accounts
                        .caller
                        .to_account_info()
                        .try_borrow_mut_lamports()? += refund_amount.unwrap();
                    Ok(())
                } else {
                    msg!("Unknown Caller: Cannot Withdraw Funds");
                    Ok(())
                }
            }

        }
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        seeds = [startup_owner.key().as_ref()], bump,
        payer = startup_owner,
        space = 8 + InvestmentContract::MAX_SIZE
    )]
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

#[derive(Accounts)]
pub struct FinishStartup<'info> {
    #[account(mut)]
    pub investment_contract: Account<'info, InvestmentContract>,
    #[account(mut)]
    pub caller: Signer<'info>,
    pub system_program: Program<'info, System>,
    pub clock: Sysvar<'info, Clock>,
}

#[derive(Accounts)]
pub struct RefundStartup<'info> {
    #[account(mut)]
    pub investment_contract: Account<'info, InvestmentContract>,
    #[account(mut)]
    pub caller: Signer<'info>,
    pub system_program: Program<'info, System>,
    pub clock: Sysvar<'info, Clock>,
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
    pub bump: u8,
    pub investors_list: Vec<(Pubkey, u64)>,
}

impl InvestmentContract {
    const MAX_SIZE: usize = 1024;
}
