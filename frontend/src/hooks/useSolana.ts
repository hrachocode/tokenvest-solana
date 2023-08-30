import { Program, web3 } from "@project-serum/anchor";
import idl from "../../../solana_investment_contract/target/idl/investment_contract.json";
import * as anchor from "@project-serum/anchor";
import { PublicKeyData } from "@solana/web3.js";
import { useSolanaGetProvider } from "./useSolanaGetProvider";
import { solanaInvest } from "@/utils/solanaHookUtils";
import { Dispatch, SetStateAction } from "react";

export const useSolana = () => {
  const { SystemProgram, LAMPORTS_PER_SOL } = web3;
  const programID = new anchor.web3.PublicKey(
    process.env.NEXT_PUBLIC_SOLANA_PROGRAM_ID as PublicKeyData
  );
  const getProvider = useSolanaGetProvider();

  const initialize = async (
    raiseGoal: string,
    sharePercentage: string,
    days: string
  ) => {
    const provider = await getProvider;
    const program = new Program(
      idl as anchor.Idl,
      programID,
      provider.provider
    );
    const { wallet } = provider.provider;
    try {
      await program.methods
        .initialize(
          new anchor.BN(sharePercentage),
          new anchor.BN(days),
          new anchor.BN(raiseGoal)
        )
        .accounts({
          investmentContract: provider.pda,
          user: wallet.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();
      const account = await program.account.investmentContract.fetch(
        provider.pda
      );
      console.log(account, "accountInitialize");
    } catch (err) {
      console.log("Transaction error: ", err);
    }
  };

  const invest = async (
    investAmount: number,
    resRaisedAmount: string,
    setResRaisedAmount: Dispatch<SetStateAction<string>>,
    productId: string
  ) => {
    const provider = await getProvider;
    const program = new Program(
      idl as anchor.Idl,
      programID,
      provider.provider
    );
    const { wallet } = provider.provider;
    try {
      await program.methods
        .invest(new anchor.BN(investAmount * LAMPORTS_PER_SOL))
        .accounts({
          user: wallet.publicKey,
          investmentContract: provider.pda,
          systemProgram: SystemProgram.programId,
        })
        .rpc();
      const account = await program.account.investmentContract.fetch(
        provider.pda
      );
      console.log(account, "acountInvest");
      const resInvestAmount = Number(investAmount);
      const ownerAddress = wallet.publicKey.toString();
      await solanaInvest(
        productId,
        resInvestAmount,
        resRaisedAmount,
        setResRaisedAmount,
        ownerAddress
      );
    } catch (err) {
      console.log("Transaction error: ", err);
    }
  };

  const withdraw = async () => {
    const provider = await getProvider;
    const program = new Program(
      idl as anchor.Idl,
      programID,
      provider.provider
    );
    const { wallet } = provider.provider;
    try {
      await program.methods
        .withdraw()
        .accounts({
          user: wallet.publicKey,
          investmentContract: provider.pda,
          systemProgram: SystemProgram.programId,
        })
        .rpc();
      const account = await program.account.investmentContract.fetch(
        provider.pda
      );

      console.log(account, "acountWithdraw");
    } catch (err) {
      console.log("Transaction error: ", err);
    }
  };

  return { initialize, invest, withdraw };
};
