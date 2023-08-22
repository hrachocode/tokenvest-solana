import { AnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { Program, web3, AnchorProvider } from "@project-serum/anchor";
import idl from "../../../solana_investment_contract/target/idl/investment_contract.json";
import * as anchor from "@project-serum/anchor";
import { Cluster } from "@solana/web3.js";

export const useSolana = () => {
  const [isExtensionExist, setIsExtensionExist] = useState<string | undefined>(
    undefined
  );
  useEffect(() => {
    isExtensionExist &&
      window.open("https://phantom.app/", "_blank", "noopener,noreferrer");
  }, [isExtensionExist]);
  const wallet = useWallet();
  const { SystemProgram, LAMPORTS_PER_SOL, Keypair } = web3;

  const InvestmentContract = Keypair.generate();
  const investmentContract = InvestmentContract.publicKey;
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
    return provider;
  };

  const initialize = async (
    raiseGoal: string,
    sharePercentage: string,
    days: string
  ) => {
    const provider = await getProvider();
    const program = new Program(idl as anchor.Idl, programID, provider);
    try {
      await program.methods
        .initialize(
          new anchor.BN(sharePercentage),
          new anchor.BN(days),
          new anchor.BN(raiseGoal)
        )
        .accounts({
          investmentContract,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .signers([InvestmentContract])
        .rpc();
      const account = await program.account.investmentContract.fetch(
        InvestmentContract.publicKey
      );
      console.log(InvestmentContract.publicKey.toString(), "initialize");
    } catch (err) {
      console.log("Transaction error: ", err);
    }
  };

  const invest = async (investAmount: number) => {
    const provider = await getProvider();
    const program = new Program(idl as anchor.Idl, programID, provider);
    try {
      await program.methods
        .invest(new anchor.BN(investAmount * LAMPORTS_PER_SOL))
        .accounts({
          user: provider.wallet.publicKey,
          investmentContract: InvestmentContract.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();
      const account = await program.account.investmentContract.fetch(
        InvestmentContract.publicKey
      );
    } catch (err) {
      console.log("Transaction error: ", err);
    }
  };

  const getExtension = () => {
    if ("solana" in window) {
      const provider = window.solana as any;
      if (provider.isPhantom) return provider;
    } else {
      setIsExtensionExist("Install Phantom");
    }
  };

  return { getExtension, initialize, invest };
};
