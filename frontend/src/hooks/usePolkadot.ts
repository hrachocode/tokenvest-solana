import { useEffect, useState } from "react";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { web3Accounts, web3Enable, web3FromAddress } from "@polkadot/extension-dapp";
import { DAPP_NAME, MAX_CALL_WEIGHT, PROOFSIZE, SHIBUYA_NETWORK, storageDepositLimit } from "@/constants/polkadot";
import * as abi from "../contracts/investment_smart_contract.json";
import { CodePromise, ContractPromise } from "@polkadot/api-contract";
import { createStartupAddress } from "@/constants/contracts";
import { WeightV2 } from "@polkadot/types/interfaces";
import { IUnsubRes } from "@/interfaces/polkadotInterface";

export const usePolkadot = () => {
    const [allAccounts, setAllAccount] = useState<InjectedAccountWithMeta[]>([]);
    const [deployedContractAddress, setDeployedContractAddress] = useState("");
    const wsProvider = new WsProvider(SHIBUYA_NETWORK);

    const getAccounts = async () => {
        const extensions = await web3Enable(DAPP_NAME);
        if (extensions.length === 0) {
            return;
        };
        const accounts = await web3Accounts();
        setAllAccount(accounts);
    };

    useEffect(() => {
        getAccounts();
    }, []);

    const sendTransaction = async (senderAddress: string, receiverAddress: string) => {
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

    const invest = async (accountAddress: string, investValue: number) => {
        //@ts-ignore
        const value = BigInt(investValue) * 1000000000000000000n;
        const api = await ApiPromise.create({ provider: wsProvider });
        const contract = new ContractPromise(api, abi, createStartupAddress);
        const injector = await web3FromAddress(accountAddress);

        const options = {
            storageDepositLimit,
            gasLimit: api.registry.createType('WeightV2', {
                refTime: MAX_CALL_WEIGHT,
                proofSize: PROOFSIZE,
            }) as WeightV2,
        };

        const { gasRequired, result } = await contract.query.invest(
            accountAddress,
            options
        );

        if (result.isOk) {
            const tx = contract.tx.invest({ storageDepositLimit, gasLimit: gasRequired, value })
            const unsub = await tx.signAndSend(accountAddress, { signer: injector.signer }, ({ status }: IUnsubRes) => {
                if (status.isInBlock) {
                    console.log('in a block');
                } else if (status.isFinalized) {
                    console.log('finalized');
                    unsub();
                };
            });
        };
    };

    const withdraw = async (accountAddress: string) => {
        const api = await ApiPromise.create({ provider: wsProvider });
        const contract = new ContractPromise(api, abi, createStartupAddress);
        const injector = await web3FromAddress(accountAddress);

        const options = {
            storageDepositLimit: null,
            gasLimit: api.registry.createType('WeightV2', {
                refTime: MAX_CALL_WEIGHT,
                proofSize: PROOFSIZE,
            }) as WeightV2,
        };

        const { gasRequired, result } = await contract.query.invest(
            accountAddress,
            options
        );

        if (result.isOk) {
            const tx = contract.tx.withdraw({ storageDepositLimit, gasLimit: gasRequired })
            const unsub = await tx.signAndSend(accountAddress, { signer: injector.signer }, ({ status }: IUnsubRes) => {
                if (status.isInBlock) {
                    console.log('in a block');
                } else if (status.isFinalized) {
                    console.log('finalized');
                    unsub();
                };
            });
        };
    };

    const deploy = async (accountAddress: string, wasm: any, startupName: string, raiseGoal: string) => {
        const api = await ApiPromise.create({ provider: wsProvider });
        const injector = await web3FromAddress(accountAddress);
        const code = new CodePromise(api, abi, wasm);

        console.log(code, "code");

        //@ts-ignore
        const refTime = 100000n * 1000000n;
        //@ts-ignore
        const proofSize = 100000n;

        const options = {
            storageDepositLimit,
            gasLimit: api.registry.createType('WeightV2', {
                refTime,
                proofSize
            }) as WeightV2,
        };

        const tx = code.tx.new(options, raiseGoal, startupName);
        const unsub = await tx.signAndSend(
            accountAddress,
            { signer: injector.signer },
            ({ status, contract }: IUnsubRes) => {
                if (status.isInBlock) {
                    console.log("in a block");
                } else if (status.isFinalized) {
                    if (contract) {
                        setDeployedContractAddress(contract.address.toString());
                        console.log(contract.address.toString(), "contract address");
                    };
                    console.log("finalized");
                    unsub();
                };
            });
    };

    return { allAccounts, sendTransaction, invest, withdraw, deploy, deployedContractAddress };
};