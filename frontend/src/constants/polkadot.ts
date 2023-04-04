import { BN, BN_ONE } from "@polkadot/util";

export const SHIBUYA_NETWORK = process.env.NEXT_PUBLIC_SHIBUYA_NETWORK;
export const POLKADOT_NETWORK = process.env.NEXT_PUBLIC_POLKADOT_NETWORK;
export const DAPP_NAME = process.env.NEXT_PUBLIC_DAPP_NAME || "Dapp";

const CALL_WEIGHT = 5_000_000_000_000;
const PROOFSIZE_NUM = 1_000_000;

export const SHIBUYA_ADDRESS:string = "bCPAiC9adx7UuvTke9qYDsfk2oiFFyMPS4LDZRc6YKPBKZC";
export const MAX_CALL_WEIGHT = new BN(CALL_WEIGHT).isub(BN_ONE);
export const PROOFSIZE = new BN(PROOFSIZE_NUM);
export const storageDepositLimit = null;

export const SAMPLE_ADDRESS: string = "5DRe5jhpn7fUNBbNuzBWaQSDRVntopfYGhSuoMuU6kdXEaia";