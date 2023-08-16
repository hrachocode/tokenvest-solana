import { META_MASK_MISSING_ERROR } from "@/constants/ethereum";
import { investEthers, withdrawInvestorEthers } from "@/utils/ethereumHookUtils";
import { JsonRpcSigner } from "@ethersproject/providers";
import { ContractFactory, ethers } from "ethers";
import { useEffect, useState } from "react";
import abi from "../../contract/investment_smart_contract_ethereum.json";

export const useEthereumSmartContracts = () => {
  const [ account, setAccount ] = useState("");
  const [ errorMessage, setErrorMessage ] = useState("");
  const [ signer, setSigner ] = useState<JsonRpcSigner>();

  const windowEthereum = (window as any).ethereum;

  const connectWallet = async () => {
    if (windowEthereum) {
      const provider = new ethers.providers.Web3Provider(windowEthereum);
      const account = await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      setSigner(signer);
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
      const factory = new ContractFactory(abi.abi, abi.bytecode, signer);
      const contract = await factory.deploy(investmentGoal, sharePercentage, endTime);
      console.log(contract);
    } catch (err) {
      alert(err);
    }
  };

  const invest = async (
    contractAddress: string,
    investAmount: string
  ) => {
    try {
      const contract = new ethers.Contract(contractAddress, abi.abi, signer);
      await investEthers(contract, investAmount);
    } catch (err) {
      alert(err);
    }
  };

  const withdrawInvestor = async (
    contractAddress: string
  ) => {
    try {
      const contract = new ethers.Contract(contractAddress, abi.abi, signer);
      await withdrawInvestorEthers(contract);
    } catch (err) {
      alert(err);
    }
  };

  return { account, errorMessage, deploy, invest, withdrawInvestor };
};
