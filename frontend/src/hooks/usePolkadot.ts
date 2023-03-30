import { useEffect, useState } from "react";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { web3Accounts, web3Enable, web3FromAddress } from "@polkadot/extension-dapp";
import { DAPP_NAME, DEFAULT_PROVIDER } from "@/constants/polkadot";

export const usePolkadot = () => {
    const [allAccount, setAllAccount] = useState<InjectedAccountWithMeta[]>([]);
    const wsProvider = new WsProvider(DEFAULT_PROVIDER);

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
                .transfer(receiverAddress, 123456)
                .signAndSend(senderAddress, { signer: injector.signer });

            alert(`Submitted with hash ${txHash}`);
        } catch (error) {
            alert((error as { message: string }).message);
        }
    };

    return { allAccount, sendTransaction };
};