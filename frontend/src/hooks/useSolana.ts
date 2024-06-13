import { PublicKey, PublicKeyData, SYSVAR_CLOCK_PUBKEY } from "@solana/web3.js";
import { Program, web3, BN } from "@coral-xyz/anchor";
import { Dispatch, SetStateAction } from "react";
import idl from "../../investment_contract.json";
import { TokenvestCampaign } from "../../tokenvest_campaign";
import { CMS_API, CMS_PRODUCTS, POPULATE_ALL } from "@/constants/cms";
import { useSolanaGetProvider } from "./useSolanaGetProvider";
import { solanaInvest } from "@/utils/solanaHookUtils";
import { METHODS, handleRequest } from "@/utils/handleRequest";
import { addDaysToTimestamp } from "../utils/addDaysToTimestamp";
import { showNotification } from "@/utils/showNotification";
import * as anchor from "@coral-xyz/anchor";
import { TOKEN_PROGRAM_ID, getAssociatedTokenAddress } from "@solana/spl-token";

export const useSolana = () => {
  const { SystemProgram, LAMPORTS_PER_SOL } = web3;
  const programID = new web3.PublicKey(
    process.env.NEXT_PUBLIC_SOLANA_PROGRAM_ID as PublicKeyData
  );
  const getProvider = useSolanaGetProvider();
  const usdcMint = new web3.PublicKey(
    process.env.NEXT_PUBLIC_USDC_MINT as string
  );

  const initialize = async (
    raiseGoal: string,
    days: string,
    productId: string
  ) => {
    const provider = await getProvider;
    const productIdString = productId.toString();
    const program = new Program(idl as TokenvestCampaign, provider.provider);
    const { wallet } = provider.provider;

    const investmentContract = PublicKey.findProgramAddressSync(
      [
        anchor.utils.bytes.utf8.encode("tokenvest"),
        wallet.publicKey.toBuffer(),
        anchor.utils.bytes.utf8.encode(productIdString),
      ],
      programID
    )[0];

    const usdcVault = PublicKey.findProgramAddressSync(
      [
        anchor.utils.bytes.utf8.encode("tokenvest"),
        investmentContract.toBuffer(),
      ],
      programID
    )[0];

    try {
      await program.methods
        .initialize(
          productIdString,
          new BN(+raiseGoal * LAMPORTS_PER_SOL),
          new BN(addDaysToTimestamp(days))
        )
        .accountsStrict({
          investmentContract: investmentContract,
          startupOwner: wallet.publicKey,
          usdcMint: usdcMint,
          usdcVault: usdcVault,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
          clock: SYSVAR_CLOCK_PUBKEY,
        })
        .rpc();

      const account = await program.account.investmentContract.fetch(
        investmentContract
      );

      if (account) {
        showNotification("Campaign successfully initialized");
        await handleRequest(
          `${process.env.NEXT_PUBLIC_CMS_URL}${CMS_API}${CMS_PRODUCTS}/${productId}`,
          METHODS.PUT,
          {
            data: {
              ownerAddress: wallet.publicKey.toString(),
            },
          }
        );
      }
    } catch (error) {
      showNotification((error as { message: string }).message, "error");
    }
  };

  const invest = async (
    investAmount: number,
    resRaisedAmount: number,
    setResRaisedAmount: Dispatch<SetStateAction<number>>,
    productId: string
  ) => {
    const provider = await getProvider;
    const program = new Program(idl as TokenvestCampaign, provider.provider);
    const { wallet } = provider.provider;
    const {
      data: { attributes },
    } = await handleRequest(
      `${process.env.NEXT_PUBLIC_CMS_URL}${CMS_API}${CMS_PRODUCTS}/${productId}${POPULATE_ALL}`,
      METHODS.GET
    );
    const ownerPublicKey = new PublicKey(`${attributes.ownerAddress}`);
    const investmentContract = PublicKey.findProgramAddressSync(
      [
        anchor.utils.bytes.utf8.encode("tokenvest"),
        ownerPublicKey.toBuffer(),
        anchor.utils.bytes.utf8.encode(productId),
      ],
      programID
    )[0];

    const usdcVault = PublicKey.findProgramAddressSync(
      [
        anchor.utils.bytes.utf8.encode("tokenvest"),
        investmentContract.toBuffer(),
      ],
      programID
    )[0];

    const investorData = PublicKey.findProgramAddressSync(
      [
        anchor.utils.bytes.utf8.encode("tokenvest"),
        wallet.publicKey.toBuffer(),
        anchor.utils.bytes.utf8.encode(productId),
      ],
      programID
    )[0];

    const investorAta = await getAssociatedTokenAddress(
      usdcMint,
      wallet.publicKey,
      false,
      TOKEN_PROGRAM_ID
    );

    try {
      await program.methods
        .invest(new BN(investAmount * 1000000))
        .accountsStrict({
          investmentContract: investmentContract,
          usdcMint: usdcMint,
          usdcVault: usdcVault,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
          from: wallet.publicKey,
          investorAta: investorAta,
          investorData: investorData,
        })
        .rpc();

      const resInvestAmount = Number(investAmount);
      const ownerAddress = wallet.publicKey.toString();
      await solanaInvest(
        productId,
        resInvestAmount,
        resRaisedAmount,
        setResRaisedAmount,
        ownerAddress
      );
    } catch (error) {
      showNotification((error as { message: string }).message, "error");
    }
  };

  const finishStartup = async (productId: string) => {
    const provider = await getProvider;
    const program = new Program(idl as TokenvestCampaign, provider.provider);
    const { wallet } = provider.provider;
    const {
      data: { attributes },
    } = await handleRequest(
      `${process.env.NEXT_PUBLIC_CMS_URL}${CMS_API}${CMS_PRODUCTS}/${productId}${POPULATE_ALL}`,
      METHODS.GET
    );
    const ownerPublicKey = new PublicKey(`${attributes.ownerAddress}`);
    const investmentContract = PublicKey.findProgramAddressSync(
      [
        anchor.utils.bytes.utf8.encode("tokenvest"),
        ownerPublicKey.toBuffer(),
        anchor.utils.bytes.utf8.encode(productId),
      ],
      programID
    )[0];

    const usdcVault = PublicKey.findProgramAddressSync(
      [
        anchor.utils.bytes.utf8.encode("tokenvest"),
        investmentContract.toBuffer(),
      ],
      programID
    )[0];

    const investorAta = await getAssociatedTokenAddress(
      usdcMint,
      wallet.publicKey,
      false,
      TOKEN_PROGRAM_ID
    );

    try {
      await program.methods
        .finishStartup()
        .accountsStrict({
          investmentContract: investmentContract,
          caller: wallet.publicKey,
          usdcMint: usdcMint,
          callerAta: investorAta,
          usdcVault: usdcVault,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
          clock: SYSVAR_CLOCK_PUBKEY,
        })
        .rpc();
      showNotification("Transaction Successful");
    } catch (error) {
      showNotification((error as { message: string }).message, "error");
    }
  };

  const refundStartup = async (productId: string) => {
    const provider = await getProvider;
    const program = new Program(idl as TokenvestCampaign, provider.provider);
    const { wallet } = provider.provider;
    const {
      data: { attributes },
    } = await handleRequest(
      `${process.env.NEXT_PUBLIC_CMS_URL}${CMS_API}${CMS_PRODUCTS}/${productId}${POPULATE_ALL}`,
      METHODS.GET
    );
    const ownerPublicKey = new PublicKey(`${attributes.ownerAddress}`);

    const investmentContract = PublicKey.findProgramAddressSync(
      [
        anchor.utils.bytes.utf8.encode("tokenvest"),
        ownerPublicKey.toBuffer(),
        anchor.utils.bytes.utf8.encode(productId),
      ],
      programID
    )[0];

    const investorAta = await getAssociatedTokenAddress(
      usdcMint,
      wallet.publicKey,
      false,
      TOKEN_PROGRAM_ID
    );

    const investorData = PublicKey.findProgramAddressSync(
      [
        anchor.utils.bytes.utf8.encode("tokenvest"),
        wallet.publicKey.toBuffer(),
        anchor.utils.bytes.utf8.encode(productId),
      ],
      programID
    )[0];

    const usdcVault = PublicKey.findProgramAddressSync(
      [
        anchor.utils.bytes.utf8.encode("tokenvest"),
        investmentContract.toBuffer(),
      ],
      programID
    )[0];

    try {
      await program.methods
        .refundStartup()
        .accountsStrict({
          investmentContract: investmentContract,
          investorData: investorData,
          usdcVault: usdcVault,
          caller: wallet.publicKey,
          callerAta: investorAta,
          usdcMint: usdcMint,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          clock: SYSVAR_CLOCK_PUBKEY,
        })
        .rpc();
    } catch (error) {
      showNotification((error as { message: string }).message, "error");
    }
  };

  return { initialize, invest, finishStartup, refundStartup };
};
