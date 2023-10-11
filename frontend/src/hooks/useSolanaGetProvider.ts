import { AnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { web3, AnchorProvider } from "@project-serum/anchor";
import { Cluster } from "@solana/web3.js";

export const useSolanaGetProvider = async () => {
  const wallet = useWallet();
  const opts = {
    preflightCommitment: "processed" as "processed",
  };
  const connection = new web3.Connection(
    web3.clusterApiUrl(process.env.NEXT_PUBLIC_SOLANA as Cluster),
    "confirmed"
  );
  const provider = new AnchorProvider(
    connection,
    wallet as unknown as AnchorWallet,
    opts
  );
  const pda = web3.Keypair.generate();

  return {
    provider,
    pda,
  };
};
