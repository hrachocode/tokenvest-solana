import { useEffect, useState } from "react";
import { AccountInfo } from '@polkadot/types/interfaces';
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import { ApiPromise, WsProvider } from '@polkadot/api';
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { Box, Typography } from "@mui/material";

const Extension = () => {
    const [allAccount, setAllAccount] = useState<InjectedAccountWithMeta[]>([]);

    const getAccounts = async () => {
        const wsProvider = new WsProvider('wss://rpc.polkadot.io');
        const api = await ApiPromise.create({ provider: wsProvider });
        const extensions = await web3Enable("my cool dapp");
        if (extensions.length === 0) {
            return;
        };

        const accounts = await web3Accounts();

        if (!accounts[0].address) {
            return;
        };


        const ADDR = accounts[0].address;

        const now = await api.query.timestamp.now();
        const { nonce, data: balance } = await api.query.system.account<AccountInfo>(ADDR);

        console.log(`${now}: balance of ${balance.free} and a nonce of ${nonce}`);

        const chain = await api.rpc.system.chain();

        const lastHeader = await api.rpc.chain.getHeader();

        console.log(`${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`);

        // const txHash = await api.tx.balances
        //     .transfer(BOB, 12345)
        //     .signAndSend(alice);

        // console.log(`Submitted with hash ${txHash}`);

        setAllAccount(accounts);
    };

    useEffect(() => {
        getAccounts();
    }, []);

    return (
        <>
            <Box>
                {typeof allAccount !== "undefined"
                    ? allAccount.map((account, index) => {
                        return (
                            <Box key={index + 1}>
                                <Typography>Account name: {account.meta.name}</Typography>
                                <Typography>Account address: {account.address}</Typography>
                            </Box>
                        );
                    })
                    : <></>}
            </Box>
        </>
    );
};

export default Extension;