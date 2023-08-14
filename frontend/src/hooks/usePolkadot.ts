import { useEffect, useState } from "react";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { web3FromAddress } from "@polkadot/extension-dapp";
import { INVEST_VALUE_MULTIPLIER, SHIBUYA_NETWORK } from "@/constants/polkadot";
import abi from "../../contract/investment_smart_contract.json";
import { CodePromise, ContractPromise } from "@polkadot/api-contract";
import { checkExtensionStatus, dryRunOptions, getAccounts, polkadotDeploy, polkadotInvest, polkadotWithdrawInvestor, polkadotWithdrawPo } from "@/utils/polkadotHookUtils";

export const usePolkadot = () => {
  const [ allAccounts, setAllAccount ] = useState<InjectedAccountWithMeta[]>([]);
  const [ isExtensionActive, setExtensionActive ] = useState(false);
  const wsProvider = new WsProvider(SHIBUYA_NETWORK);

  useEffect(() => {
    getAccounts(setAllAccount, setExtensionActive);
  }, []);

  const invest = async (
    accountAddress: string,
    investValue: number,
    contractAddress: string,
    productId: string,
    ownerAddress: string,
    raiseGoal: string) => {
    if (!checkExtensionStatus(isExtensionActive)) {
      return;
    };
    const value = BigInt(investValue) * INVEST_VALUE_MULTIPLIER;
    const api = await ApiPromise.create({ provider: wsProvider });
    const contract = new ContractPromise(api, abi, contractAddress);
    const injector = await web3FromAddress(accountAddress);

    const options = dryRunOptions(api);

    const { gasRequired, result } = await contract.query.invest(
      accountAddress,
      options
    );

    const { debugMessage: alreadyInvestedAmount } = await contract.query.showAmount(
      accountAddress,
      options
    );

    if (result.isOk) {
      await polkadotInvest(
        contract,
        gasRequired,
        value,
        accountAddress,
        injector,
        options,
        alreadyInvestedAmount,
        productId,
        raiseGoal,
        ownerAddress
      );
    };
  };

  const withdrawInvestor = async (accountAddress: string, contractAddress: string) => {
    if (!checkExtensionStatus(isExtensionActive)) {
      return;
    };
    const api = await ApiPromise.create({ provider: wsProvider });
    const contract = new ContractPromise(api, abi, contractAddress);
    const injector = await web3FromAddress(accountAddress);

    const options = dryRunOptions(api);

    const { gasRequired, result } = await contract.query.invest(
      accountAddress,
      options
    );

    if (result.isOk) {
      await polkadotWithdrawInvestor(
        contract,
        gasRequired,
        accountAddress,
        injector
      );
    };
  };

  const withdrawPo = async (accountAddress: string, contractAddress: string) => {
    if (!checkExtensionStatus(isExtensionActive)) {
      return;
    };
    const api = await ApiPromise.create({ provider: wsProvider });
    const contract = new ContractPromise(api, abi, contractAddress);
    const injector = await web3FromAddress(accountAddress);

    const options = dryRunOptions(api);

    const { gasRequired, result } = await contract.query.invest(
      accountAddress,
      options
    );

    if (result.isOk) {
      await polkadotWithdrawPo(
        contract,
        gasRequired,
        accountAddress,
        injector
      );
    };
  };

  const deploy = async (
    accountAddress: string,
    raiseGoal: string,
    sharePercentage: string,
    days: string,
    productId: string) => {
    if (!checkExtensionStatus(isExtensionActive)) {
      return;
    };
    const api = await ApiPromise.create({ provider: wsProvider });
    const injector = await web3FromAddress(accountAddress);
    const code = new CodePromise(api, abi, abi.source.wasm);

    const options = dryRunOptions(api);

    await polkadotDeploy(
      code,
      options,
      raiseGoal,
      sharePercentage,
      days,
      accountAddress,
      injector,
      productId
    );
  };

  return { allAccounts, invest, withdrawInvestor, withdrawPo, deploy };
};
