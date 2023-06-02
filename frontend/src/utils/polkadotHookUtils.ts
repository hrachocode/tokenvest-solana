import { CMS_API, CMS_NOTIFICATIONS, CMS_PRODUCTS } from "@/constants/cms";
import { OPEN_OPTION_BLANK } from "@/constants/general";
import { DAPP_NAME, INVEST_VALUE_MULTIPLIER, MAX_CALL_WEIGHT, POLKADOT_EXTENSIONS_MISSING_MESSAGE, POLKADOT_EXTENSION_URL, PROOFSIZE, storageDepositLimit, WEIGHT_V2 } from "@/constants/polkadot";
import { IUnsubRes } from "@/interfaces/polkadotInterface";
import { ApiPromise } from "@polkadot/api";
import { CodePromise, ContractPromise } from "@polkadot/api-contract";
import { SignerOptions } from "@polkadot/api/types";
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import { Text } from "@polkadot/types";
import { Weight, WeightV2 } from "@polkadot/types/interfaces";
import { handleRequest, METHODS } from "./handleRequest";

export const getAccounts = async (setAllAccount: Function, setExtensionActive: Function) => {
  const extensions = await web3Enable(DAPP_NAME);
  if (extensions.length === 0) {
    return;
  };
  const accounts = await web3Accounts();
  setAllAccount(accounts);
  setExtensionActive(true);
};

export const checkExtensionStatus = (isExtensionActive: boolean) => {
  if (!isExtensionActive) {
    alert(POLKADOT_EXTENSIONS_MISSING_MESSAGE);
    window.open(POLKADOT_EXTENSION_URL, OPEN_OPTION_BLANK);
    return false;
  } else {
    return true;
  }
};

export const dryRunOptions = (api: ApiPromise) => {
  return {
    storageDepositLimit,
    gasLimit: api.registry.createType(WEIGHT_V2, {
      refTime: MAX_CALL_WEIGHT,
      proofSize: PROOFSIZE,
    }) as WeightV2
  };
};

export const polkadotInvest = async (
  contract: ContractPromise,
  gasRequired: Weight,
  value: bigint,
  accountAddress: string,
  injector: Partial<SignerOptions>,
  options: {
        storageDepositLimit: null;
        gasLimit: WeightV2;
    },
  alreadyInvestedAmount: Text,
  productId: string,
  raiseGoal: string,
  ownerAddress: string) => {
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

export const polkadotWithdrawInvestor = async (
  contract: ContractPromise,
  gasRequired: Weight,
  accountAddress: string,
  injector: Partial<SignerOptions>
) => {
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

export const polkadotWithdrawPo = async (
  contract: ContractPromise,
  gasRequired: Weight,
  accountAddress: string,
  injector: Partial<SignerOptions>
) => {
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

export const polkadotDeploy = async (
  code: CodePromise,
  options: {
        storageDepositLimit: null;
        gasLimit: WeightV2;
    },
  raiseGoal: string,
  sharePercentage: string,
  days: string,
  accountAddress: string,
  injector: Partial<SignerOptions>,
  productId: string
) => {
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
