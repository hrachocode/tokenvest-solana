import { AnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { Program, web3, AnchorProvider } from "@project-serum/anchor";
import idl from "../../../solana_investment_contract/target/idl/investment_contract.json";
import * as anchor from "@project-serum/anchor";
import { Cluster } from "@solana/web3.js";

export const useSolana = () => {
  const wallet = useWallet();
  const { SystemProgram, LAMPORTS_PER_SOL } = web3;

  const opts = {
    preflightCommitment: "processed" as "processed",
  };
  const programID = new anchor.web3.PublicKey(
    "5daxCs5LvkZuU599JuRTWc1poexpkSwPU1hCPWQDQzmJ"
  );

  const getProvider = async () => {
    let connection = new web3.Connection(
      web3.clusterApiUrl(process.env.NEXT_PUBLIC_SOLANA as Cluster),
      "confirmed"
    );

    const provider = new AnchorProvider(
      connection,
      wallet as unknown as AnchorWallet,
      opts
    );
    const [pda] = await web3.PublicKey.findProgramAddress(
      [provider.wallet.publicKey.toBuffer()],
      programID
    );
    return {
      provider,
      pda,
    };
  };

  const initialize = async (
    raiseGoal: string,
    sharePercentage: string,
    days: string
  ) => {
    const provider = await getProvider();
    const program = new Program(
      idl as anchor.Idl,
      programID,
      provider.provider
    );
    try {
      await program.methods
        .initialize(
          new anchor.BN(sharePercentage),
          new anchor.BN(days),
          new anchor.BN(raiseGoal)
        )
        .accounts({
          investmentContract: provider.pda,
          user: provider.provider.wallet.publicKey,
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

  const invest = async (investAmount: number) => {
    const provider = await getProvider();
    const program = new Program(
      idl as anchor.Idl,
      programID,
      provider.provider
    );
    try {
      await program.methods
        .invest(new anchor.BN(investAmount * LAMPORTS_PER_SOL))
        .accounts({
          user: provider.provider.wallet.publicKey,
          investmentContract: provider.pda,
          systemProgram: SystemProgram.programId,
        })
        .rpc();
      const account = await program.account.investmentContract.fetch(
        provider.pda
      );

      console.log(account, "acountInvest");
    } catch (err) {
      console.log("Transaction error: ", err);
    }
  };

  const withdraw = async () => {
    const provider = await getProvider();
    const program = new Program(
      idl as anchor.Idl,
      programID,
      provider.provider
    );
    try {
      await program.methods
        .withdraw()
        .accounts({
          user: provider.provider.wallet.publicKey,
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
