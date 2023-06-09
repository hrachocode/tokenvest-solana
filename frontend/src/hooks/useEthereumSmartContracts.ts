import { META_MASK_MISSING_ERROR } from "@/constants/ethereum";
import { ContractFactory, ethers } from "ethers";
import { useEffect, useState } from "react";
import abi from "../../contract/investment_smart_contract_ethereum.json";

export const useEthereumSmartContracts = () => {
  const [ account, setAccount ] = useState("");
  const [ errorMessage, setErrorMessage ] = useState("");
  const windowEthereum = (window as any).ethereum;

  const connectWallet = async () => {
    if (windowEthereum) {
      const provider = new ethers.providers.Web3Provider(windowEthereum);
      const account = await provider.send("eth_requestAccounts", []);
      setAccount(account[0]);
    } else {
      setErrorMessage(META_MASK_MISSING_ERROR);
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  const deploy = async (
    investmentGoal: string,
    sharePercentage: string,
    endTime: string
  ) => {
    try {
      const provider = new ethers.providers.Web3Provider(windowEthereum);
      const signer = provider.getSigner();
      const factory = new ContractFactory(abi.abi, abi.bytecode, signer);
      const contract = await factory.deploy(investmentGoal, sharePercentage, endTime);
    } catch (err) {
      alert(err);
    }
  };

  return { account, errorMessage, deploy };
};

