import { Program, web3 } from "@coral-xyz/anchor";
import idl from "../..//investment_contract.json";
import { TokenvestCampaign } from "../../tokenvest_campaign";
import { useSolanaGetProvider } from "./useSolanaGetProvider";
import { PublicKey, PublicKeyData } from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import { useEffect, useState } from "react";

export const useSolanaGetBalance = (
  productId: string,
  publicKey?: PublicKey | null
) => {
  const [ hasFetched, setHasFetched ] = useState(false);
  const [ amount, setAmount ] = useState<number | undefined>();
  const { provider } = useSolanaGetProvider();
  const program = new Program(idl as TokenvestCampaign, provider);

  useEffect(() => {
    (async () => {
      if (publicKey && !hasFetched) {
        const programID = new web3.PublicKey(
          process.env.NEXT_PUBLIC_SOLANA_PROGRAM_ID as PublicKeyData
        );
        const investorData = PublicKey?.findProgramAddressSync(
          [
            anchor.utils.bytes.utf8.encode("tokenvest"),
            publicKey?.toBuffer(),
            anchor.utils.bytes.utf8.encode(productId),
          ],
          programID
        )[0];
        try {
          const fetch = await program.account.investorData.fetch(investorData);
          setHasFetched(true);
          setAmount(+fetch.amount.toString() / 1000000);
        } catch {
          setAmount(0);
        }
      }
    })();
  }, [ publicKey, program.account.investorData, hasFetched, productId ]);

  return amount;
};
