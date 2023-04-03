import { BN, BN_ONE } from "@polkadot/util";

export const SHIBUYA_NETWORK: string = "wss://rpc.shibuya.astar.network";
export const POLKADOT_NETWORK: string = "wss://rpc.polkadot.io";
export const DAPP_NAME: string = "dapp";

export const SHIBUYA_ADDRESS:string = "bCPAiC9adx7UuvTke9qYDsfk2oiFFyMPS4LDZRc6YKPBKZC";
export const MAX_CALL_WEIGHT = new BN(5_000_000_000_000).isub(BN_ONE);
export const PROOFSIZE = new BN(1_000_000);

export const SAMPLE_ADDRESS: string = "5DRe5jhpn7fUNBbNuzBWaQSDRVntopfYGhSuoMuU6kdXEaia";