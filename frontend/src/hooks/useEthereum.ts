import { META_MASK_MISSING_ERROR } from "@/constants/ethereum";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

export const useEthereum = () => {
  const [ account, setAccount ] = useState("");
  const [ errorMessage, setErrorMessage ] = useState("");

  const connectWallet = async () => {
    //@ts-ignore
    if (window.ethereum) {
      //@ts-ignore
      const provider = new ethers.providers.Web3Provider(window.ethereum);
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

