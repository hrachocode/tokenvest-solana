import * as anchor from "@coral-xyz/anchor";
import { Program, web3 } from "@coral-xyz/anchor";
import { SYSVAR_CLOCK_PUBKEY, Connection } from "@solana/web3.js";
import { InvestmentContract } from "../target/types/investment_contract";

const addDaysToTimestamp = (days: string) => {
  return Math.floor(+new Date() / 1000) + +days * 24 * 60 * 60;
};

describe("Tokenvest Initialization", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const wallet1 = anchor.web3.Keypair.generate();
  const connection = new Connection("http://127.0.0.1:8899", "confirmed");

  const program = anchor.workspace
    .InvestmentContract as Program<InvestmentContract>;
  const pda = anchor.web3.Keypair.generate();

  it("should initialized!", async () => {
    const tx = await connection.requestAirdrop(
      wallet1.publicKey,
      anchor.web3.LAMPORTS_PER_SOL * 100
    );

    const latestBlockHash = connection.getLatestBlockhash();
    await connection.confirmTransaction({
      blockhash: (await latestBlockHash).blockhash,
      lastValidBlockHeight: (await latestBlockHash).lastValidBlockHeight,
      signature: tx,
    });

    await program.rpc.initialize(
      new anchor.BN(3 * web3.LAMPORTS_PER_SOL),
      new anchor.BN(addDaysToTimestamp("10")),
      {
        accounts: {
          investmentContract: pda.publicKey,
          startupOwner: provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
          clock: SYSVAR_CLOCK_PUBKEY,
        },
        signers: [pda],
      }
    );
  });

  it("should invest!", async () => {
    await program.rpc.invest(new anchor.BN(12 * web3.LAMPORTS_PER_SOL), {
      accounts: {
        investmentContract: pda.publicKey,
        from: wallet1.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [wallet1],
    });
  });

  it("should refundStartup!", async () => {
    console.log(wallet1.publicKey.toString());
    await program.rpc.refundStartup({
      accounts: {
        investmentContract: pda.publicKey,
        caller: wallet1.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
        clock: SYSVAR_CLOCK_PUBKEY,
      },
      signers: [wallet1],
    });
  });
});
