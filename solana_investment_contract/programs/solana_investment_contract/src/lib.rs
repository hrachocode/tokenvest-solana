use anchor_lang::prelude::*;
use std::str::FromStr;
declare_id!("5daxCs5LvkZuU599JuRTWc1poexpkSwPU1hCPWQDQzmJ");

#[program]
mod investment_contract {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>, investment_goal: u64, end_time: i64) -> Result<()> {
        msg!("first goal is: {}!", investment_goal);
        let contract_storage = &mut ctx.accounts.investment_contract;
        let startup_owner = &mut ctx.accounts.startup_owner;
        contract_storage.startup_owner = *startup_owner.key;
        contract_storage.investment_goal = investment_goal;
        contract_storage.start_time = ctx.accounts.clock.unix_timestamp;
        contract_storage.end_time = end_time;
        contract_storage.tokenvest_key = Pubkey::from_str("123").unwrap();
        msg!("start time is: {}!", contract_storage.start_time);
        msg!("goal is: {}!", contract_storage.investment_goal);
        msg!("end_time is: {}!", end_time);

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
        investment_contract.investors_list.push(InvestorInfo {
            pubkey: from_account.key(),
            amount: investment_amount,
        });
        investment_contract.tokens_collected += investment_amount;
        msg!(
            "Collected Tokens: {}!",
            investment_contract.tokens_collected
        );
        Ok(())
    }

    pub fn finish_startup(ctx: Context<FinishStartup>) -> Result<()> {
        let investment_contract = &mut ctx.accounts.investment_contract;
        let startup_owner = investment_contract.startup_owner;
        let tokenvest_key = investment_contract.tokenvest_key;
        let caller = &ctx.accounts.caller;
        if investment_contract.end_time > ctx.accounts.clock.unix_timestamp {
            msg!("CAMPAIGN STILL RUNNING");
            Ok(())
        } else {
            msg!("goal is: {}!", investment_contract.investment_goal);
            msg!("coll amount  is: {}!", investment_contract.tokens_collected);
            if investment_contract.tokens_collected < investment_contract.investment_goal {
                msg!("CAMPAIGN FAILED");
                Ok(())
            } else {
                let tokenvest_cut = investment_contract.tokens_collected / 100 * 3;
                let final_amount = investment_contract.tokens_collected - tokenvest_cut;
                if caller.key == &startup_owner {
                    investment_contract.tokens_collected -= final_amount;
                    **ctx
                        .accounts
                        .investment_contract
                        .to_account_info()
                        .try_borrow_mut_lamports()? -= final_amount;
                    **ctx
                        .accounts
                        .caller
                        .to_account_info()
                        .try_borrow_mut_lamports()? += final_amount;
                    Ok(())
                } else {
                    if caller.key == &tokenvest_key {
                        investment_contract.tokens_collected -= tokenvest_cut;
                        **ctx
                            .accounts
                            .investment_contract
                            .to_account_info()
                            .try_borrow_mut_lamports()? -= tokenvest_cut;
                        **ctx
                            .accounts
                            .caller
                            .to_account_info()
                            .try_borrow_mut_lamports()? += tokenvest_cut;
                        Ok(())
                    } else {
                        msg!("Unknown Caller: Cannot Withdraw Funds");
                        Ok(())
                    }
                }
            }
        }
    }

    pub fn refund_startup(ctx: Context<RefundStartup>) -> Result<()> {
        let investment_contract = &mut ctx.accounts.investment_contract;
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
                    let mut refund_amount = None;
                    for investor_info in investment_contract.investors_list.iter() {
                        if &investor_info.pubkey == &caller.key() {
                            refund_amount = Some(investor_info.amount);
                            break;
                        }
                    }
                    investment_contract.tokens_collected -= refund_amount.unwrap();
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
    pub investors: Vec<Pubkey>,
    pub investors_list: Vec<InvestorInfo>,
    pub tokenvest_key: Pubkey,
}

impl InvestmentContract {
    const MAX_SIZE: usize = 1024;
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct InvestorInfo {
    pubkey: Pubkey,
    amount: u64,
}
