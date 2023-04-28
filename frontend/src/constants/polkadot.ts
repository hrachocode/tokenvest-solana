import { BN, BN_ONE } from "@polkadot/util";

export const POLKADOT_EXTENSION_URL:string = "https://polkadot.js.org/extension/";
export const POLKADOT_EXTENSIONS_MISSING_MESSAGE:string = "Polkadot{.js} extension is missing";

export const SHIBUYA_NETWORK = process.env.NEXT_PUBLIC_SHIBUYA_NETWORK;
export const POLKADOT_NETWORK = process.env.NEXT_PUBLIC_POLKADOT_NETWORK;
export const DAPP_NAME = process.env.NEXT_PUBLIC_DAPP_NAME || "Dapp";

const CALL_WEIGHT = 5_000_000_000_000;
const PROOFSIZE_NUM = 1_000_000;

export const SHIBUYA_ADDRESS:string = "bCPAiC9adx7UuvTke9qYDsfk2oiFFyMPS4LDZRc6YKPBKZC";
export const SHIBUYA_ACCOUNT_NAME:string = "Test1";
export const MAX_CALL_WEIGHT = new BN(CALL_WEIGHT).isub(BN_ONE);
export const PROOFSIZE = new BN(PROOFSIZE_NUM);
export const WEIGHT_V2:string = "WeightV2";
export const storageDepositLimit = null;

//@ts-ignore
export const DEPLOY_REF_TIME = 100000n * 1000000n;

//@ts-ignore
export const DEPLOY_PROOF_SIZE = 100000n;

//@ts-ignore
export const INVEST_VALUE_MULTIPLIER = 1000000000000000000n;

export const SAMPLE_ADDRESS: string = "5DRe5jhpn7fUNBbNuzBWaQSDRVntopfYGhSuoMuU6kdXEaia";
