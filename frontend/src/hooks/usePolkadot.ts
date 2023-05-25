import { useEffect, useState } from "react";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { web3Accounts, web3Enable, web3FromAddress } from "@polkadot/extension-dapp";
import { DAPP_NAME, DEPLOY_PROOF_SIZE, DEPLOY_REF_TIME, INVEST_VALUE_MULTIPLIER, MAX_CALL_WEIGHT, POLKADOT_EXTENSIONS_MISSING_MESSAGE, POLKADOT_EXTENSION_URL, PROOFSIZE, SHIBUYA_NETWORK, storageDepositLimit, WEIGHT_V2 } from "@/constants/polkadot";
import abi from "../../contract/investment_smart_contract.json";
import { CodePromise, ContractPromise } from "@polkadot/api-contract";
import { WeightV2 } from "@polkadot/types/interfaces";
import { IUnsubRes } from "@/interfaces/polkadotInterface";
import { handleRequest, METHODS } from "@/utils/handleRequest";
import { CMS_API, CMS_NOTIFICATIONS, CMS_PRODUCTS } from "@/constants/cms";
import { OPEN_OPTION_BLANK } from "@/constants/general";

export const usePolkadot = () => {
  const [ allAccounts, setAllAccount ] = useState<InjectedAccountWithMeta[]>([]);
  const [ isExtensionActive, setExtensionActive ] = useState(false);
  const wsProvider = new WsProvider(SHIBUYA_NETWORK);

  const getAccounts = async () => {
    const extensions = await web3Enable(DAPP_NAME);
    if (extensions.length === 0) {
      return;
    };
    const accounts = await web3Accounts();
    setAllAccount(accounts);
    setExtensionActive(true);
  };

  useEffect(() => {
    getAccounts();
  }, []);

  const checkExtensionStatus = () => {
    if (!isExtensionActive) {
      alert(POLKADOT_EXTENSIONS_MISSING_MESSAGE);
      window.open(POLKADOT_EXTENSION_URL, OPEN_OPTION_BLANK);
      return false;
    } else {
      return true;
    }
  };

  const sendTransaction = async (senderAddress: string, receiverAddress: string) => {
    if (!checkExtensionStatus()) {
      return;
    };
    const api = await ApiPromise.create({ provider: wsProvider });
    const injector = await web3FromAddress(senderAddress);

    try {
      const txHash = await api.tx.balances
        .transfer(receiverAddress, 1)
        .signAndSend(senderAddress, { signer: injector.signer });
      alert(`Submitted with hash ${txHash}`);
    } catch (error) {
      alert((error as { message: string }).message);
    }
  };

  const invest = async (
    accountAddress: string,
    investValue: number,
    contractAddress: string,
    productId: string,
    ownerAddress: string,
    raiseGoal: string) => {
    if (!checkExtensionStatus()) {
      return;
    };
    const value = BigInt(investValue) * INVEST_VALUE_MULTIPLIER;
    const api = await ApiPromise.create({ provider: wsProvider });
    const contract = new ContractPromise(api, abi, contractAddress);
    const injector = await web3FromAddress(accountAddress);

    const options = {
      storageDepositLimit,
      gasLimit: api.registry.createType(WEIGHT_V2, {
        refTime: MAX_CALL_WEIGHT,
        proofSize: PROOFSIZE,
      }) as WeightV2,
    };

    const { gasRequired, result } = await contract.query.invest(
      accountAddress,
      options
    );

    const { debugMessage: alreadyInvestedAmount } = await contract.query.showAmount(
      accountAddress,
      options
    );

    if (result.isOk) {
      try {
        const tx = contract.tx.invest({ storageDepositLimit, gasLimit: gasRequired, value });
        const unsub = await tx.signAndSend(accountAddress, { signer: injector.signer }, async ({ status }: IUnsubRes) => {
          if (status.isInBlock) {
            console.log("in a block");
          } else if (status.isFinalized) {
            console.log("finalized");
            const { debugMessage: newInvestedAmount } = await contract.query.showAmount(
              accountAddress,
              options
            );

            if (newInvestedAmount <= alreadyInvestedAmount) {
              alert("Something went wrong!!!");
            } else {
              const amount = BigInt(Number(newInvestedAmount.toHuman())) / INVEST_VALUE_MULTIPLIER;
              const amountNumber = Number(amount);

              const putRes = await handleRequest(`${CMS_API}${CMS_PRODUCTS}/${productId}`, METHODS.PUT, {
                data: {
                  raisedAmount: amountNumber,
                }
              });

              if (putRes.data) {
                if (Number(amountNumber) >= Number(raiseGoal)) {
                  await handleRequest(`${CMS_API}${CMS_NOTIFICATIONS}`, METHODS.POST, {
                    data: {
                      message: `Seat goal reached for product N: ${productId.toString()}`,
                      address: ownerAddress,
                      isOpened: false,
                      productId: productId.toString()
                    }
                  });
                };
                alert(`Successfully invested ${amountNumber}!!!`);
              } else {
                alert("Something went wrong!!!");
              }
            }
            unsub();
          };
        });
      } catch (error) {
        alert((error as { message: string }).message);
      }
    };
  };

  const withdrawInvestor = async (accountAddress: string, contractAddress: string) => {
    if (!checkExtensionStatus()) {
      return;
    };
    const api = await ApiPromise.create({ provider: wsProvider });
    const contract = new ContractPromise(api, abi, contractAddress);
    const injector = await web3FromAddress(accountAddress);

    const options = {
      storageDepositLimit: null,
      gasLimit: api.registry.createType(WEIGHT_V2, {
        refTime: MAX_CALL_WEIGHT,
        proofSize: PROOFSIZE,
      }) as WeightV2,
    };

    const { gasRequired, result } = await contract.query.invest(
      accountAddress,
      options
    );

    if (result.isOk) {
      try {
        const tx = contract.tx.withdrawInvestor({ storageDepositLimit, gasLimit: gasRequired });
        const unsub = await tx.signAndSend(accountAddress, { signer: injector.signer }, ({ status }: IUnsubRes) => {
          if (status.isInBlock) {
            console.log("in a block");
          } else if (status.isFinalized) {
            console.log("finalized");
            unsub();
          };
        });
      } catch (error) {
        alert((error as { message: string }).message);
      }
    };
  };

  const withdrawPo = async (accountAddress: string, contractAddress: string) => {
    if (!checkExtensionStatus()) {
      return;
    };
    const api = await ApiPromise.create({ provider: wsProvider });
    const contract = new ContractPromise(api, abi, contractAddress);
    const injector = await web3FromAddress(accountAddress);

    const options = {
      storageDepositLimit: null,
      gasLimit: api.registry.createType(WEIGHT_V2, {
        refTime: MAX_CALL_WEIGHT,
        proofSize: PROOFSIZE,
      }) as WeightV2,
    };

    const { gasRequired, result } = await contract.query.invest(
      accountAddress,
      options
    );

    if (result.isOk) {
      try {
        const tx = contract.tx.withdrawPo({ storageDepositLimit, gasLimit: gasRequired });
        const unsub = await tx.signAndSend(accountAddress, { signer: injector.signer }, ({ status }: IUnsubRes) => {
          if (status.isInBlock) {
            console.log("in a block");
          } else if (status.isFinalized) {
            console.log("finalized");
            unsub();
          };
        });
      } catch (error) {
        alert((error as { message: string }).message);
      }
    };
  };

  const deploy = async (
    accountAddress: string,
    raiseGoal: string,
    sharePercentage: string,
    days: string,
    productId: string) => {
    if (!checkExtensionStatus()) {
      return;
    };
    const api = await ApiPromise.create({ provider: wsProvider });
    const injector = await web3FromAddress(accountAddress);
    const code = new CodePromise(api, abi, abi.source.wasm);

    const options = {
      storageDepositLimit,
      gasLimit: api.registry.createType(WEIGHT_V2, {
        refTime: DEPLOY_REF_TIME,
        proofSize: DEPLOY_PROOF_SIZE
      }) as WeightV2,
    };

    const now = new Date();
    const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + Number(days)).getTime();

    try {
      const tx = code.tx.new(options, raiseGoal, sharePercentage, endDate);
      const unsub = await tx.signAndSend(
        accountAddress,
        { signer: injector.signer },
        async ({ status, contract }: IUnsubRes) => {
          if (status.isInBlock) {
            console.log("in a block");
          } else if (status.isFinalized) {
            if (contract) {
              const putRes = await handleRequest(`${CMS_API}${CMS_PRODUCTS}/${productId}`, METHODS.PUT, {
                data: {
                  address: contract.address.toString(),
                  isDraft: false
                }
              });
              if (putRes.data) {
                alert("Successfully deployed the product!!!");
              } else {
                alert("Something went wrong!!!");
              }
            };
            console.log("finalized");
            unsub();
          };
        });
    } catch (error) {
      alert((error as { message: string }).message);
    }
  };

  return { allAccounts, sendTransaction, invest, withdrawInvestor, withdrawPo, deploy };
};
