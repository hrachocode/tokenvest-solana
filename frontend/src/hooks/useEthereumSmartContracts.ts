import { META_MASK_MISSING_ERROR } from "@/constants/ethereum";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

export const useEthereumSmartContracts = () => {
  const [account, setAccount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const windowEthereum = (window as any).ethereum;

  const connectWallet = async () => {
    if (windowEthereum) {
      const provider = new ethers.providers.Web3Provider(windowEthereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
    } else {
      setErrorMessage(META_MASK_MISSING_ERROR);
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return { account, errorMessage };
};

