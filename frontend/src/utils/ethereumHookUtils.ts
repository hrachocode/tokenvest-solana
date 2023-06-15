import { ETHERS_GAS_LIMIT } from "@/constants/ethereum";
import { Contract, ethers } from "ethers";

export const investEthers = async (
  contract: Contract,
  investAmount: string
) => {
  const tx = await contract.invest({
    value: ethers.utils.parseEther(investAmount),
    gasLimit: ETHERS_GAS_LIMIT,
    nonce: undefined,
  });
  console.log(tx.hash);
};

export const withdrawInvestorEthers = async (
  contract: Contract
) => {
  const tx = await contract.withdrawInvestor({
    gasLimit: ETHERS_GAS_LIMIT,
    nonce: undefined,
  });
  console.log(tx.hash);
};
