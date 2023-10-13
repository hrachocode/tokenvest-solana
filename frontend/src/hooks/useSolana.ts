import { Program, web3 } from "@project-serum/anchor";
import idl from "../../investment_contract.json";
import * as anchor from "@project-serum/anchor";
import { PublicKey, PublicKeyData, SYSVAR_CLOCK_PUBKEY } from "@solana/web3.js";
import { useSolanaGetProvider } from "./useSolanaGetProvider";
import { solanaInvest } from "@/utils/solanaHookUtils";
import { Dispatch, SetStateAction } from "react";
import { METHODS, handleRequest } from "@/utils/handleRequest";
import { CMS_API, CMS_PRODUCTS, POPULATE_ALL } from "@/constants/cms";
import { addDaysToTimestamp } from "../utils/addDaysToTimestamp";

export const useSolana = () => {
  const { SystemProgram, LAMPORTS_PER_SOL } = web3;
  const programID = new anchor.web3.PublicKey(
    process.env.NEXT_PUBLIC_SOLANA_PROGRAM_ID as PublicKeyData
  );
  const getProvider = useSolanaGetProvider();

  const initialize = async (
    raiseGoal: string,
    days: string,
    productId: string
  ) => {
    const provider = await getProvider;
    const program = new Program(
      idl as anchor.Idl,
      programID,
      provider.provider
    );
    const { wallet } = provider.provider;
    const {
      pda,
      pda: { publicKey },
    } = provider;

    try {
      await program.rpc.initialize(
        new anchor.BN(+raiseGoal * LAMPORTS_PER_SOL),
        new anchor.BN(addDaysToTimestamp(days)),
        {
          accounts: {
            investmentContract: publicKey,
            startupOwner: wallet.publicKey,
            systemProgram: SystemProgram.programId,
            clock: SYSVAR_CLOCK_PUBKEY,
          },
          signers: [ pda ],
        }
      );
      const account = await program.account.investmentContract.fetch(publicKey);
      alert("Campaign successfully initialized");
      if (account) {
        await handleRequest(
          `${CMS_API}${CMS_PRODUCTS}/${productId}`,
          METHODS.PUT,
          {
            data: {
              ownerAddress: publicKey.toString(),
            },
          }
        );
      }
    } catch (err) {
      alert(err);
    }
  };

  const invest = async (
    investAmount: number,
    resRaisedAmount: number,
    setResRaisedAmount: Dispatch<SetStateAction<number>>,
    productId: string
  ) => {
    const provider = await getProvider;
    const program = new Program(
      idl as anchor.Idl,
      programID,
      provider.provider
    );
    const { wallet } = provider.provider;
    const {
      data: { attributes },
    } = await handleRequest(
      `${CMS_API}${CMS_PRODUCTS}/${productId}${POPULATE_ALL}`,
      METHODS.GET
    );
    try {
      await program.methods
        .invest(new anchor.BN(investAmount * LAMPORTS_PER_SOL))
        .accounts({
          user: wallet.publicKey,
          investmentContract: new PublicKey(`${attributes.ownerAddress}`),
          systemProgram: SystemProgram.programId,
        })
        .rpc();
      const account = await program.account.investmentContract.fetch(
        new PublicKey(`${attributes.ownerAddress}`)
      );
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
      alert(err);
    }
  };

  const finishStartup = async (productId: string) => {
    const provider = await getProvider;
    const program = new Program(
      idl as anchor.Idl,
      programID,
      provider.provider
    );
    const { wallet } = provider.provider;
    const {
      data: { attributes },
    } = await handleRequest(
      `${CMS_API}${CMS_PRODUCTS}/${productId}${POPULATE_ALL}`,
      METHODS.GET
    );
    try {
      await program.methods
        .finishStartup()
        .accounts({
          user: wallet.publicKey,
          investmentContract: new PublicKey(`${attributes.ownerAddress}`),
          systemProgram: SystemProgram.programId,
        })
        .rpc();
      const account = await program.account.investmentContract.fetch(
        new PublicKey(`${attributes.ownerAddress}`)
      );
    } catch (err) {
      alert(err);
    }
  };

  const refundStartup = async (productId: string) => {
    const provider = await getProvider;
    const program = new Program(
      idl as anchor.Idl,
      programID,
      provider.provider
    );
    const { wallet } = provider.provider;
    const {
      data: { attributes },
    } = await handleRequest(
      `${CMS_API}${CMS_PRODUCTS}/${productId}${POPULATE_ALL}`,
      METHODS.GET
    );
    try {
      await program.methods
        .refundStartup()
        .accounts({
          user: wallet.publicKey,
          investmentContract: new PublicKey(`${attributes.ownerAddress}`),
          systemProgram: SystemProgram.programId,
        })
        .rpc();
      const account = await program.account.investmentContract.fetch(
        new PublicKey(`${attributes.ownerAddress}`)
      );
    } catch (err) {
      alert(err);
    }
  };

  return { initialize, invest, finishStartup, refundStartup };
};
