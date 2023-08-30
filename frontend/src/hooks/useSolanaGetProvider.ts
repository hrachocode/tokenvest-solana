import { AnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { web3, AnchorProvider } from "@project-serum/anchor";
import * as anchor from "@project-serum/anchor";
import { Cluster, PublicKeyData } from "@solana/web3.js";

export const useSolanaGetProvider = async () => {
  const wallet = useWallet();
  const opts = {
    preflightCommitment: "processed" as "processed",
  };
  const programID = new anchor.web3.PublicKey(
    process.env.NEXT_PUBLIC_SOLANA_PROGRAM_ID as PublicKeyData
  );

  let connection = new web3.Connection(
    web3.clusterApiUrl(process.env.NEXT_PUBLIC_SOLANA as Cluster),
    "confirmed"
  );

  const provider = new AnchorProvider(
    connection,
    wallet as unknown as AnchorWallet,
    opts
  );
  const [ pda ] = await web3.PublicKey.findProgramAddress(
    [ provider.wallet.publicKey.toBuffer() ],
    programID
  );
  return {
    provider,
    pda,
  };
};
