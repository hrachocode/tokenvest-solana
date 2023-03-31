import { useEffect, useState } from "react";
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { Box, Typography } from "@mui/material";

const Extension = () => {
    const [allAccount, setAllAccount] = useState<InjectedAccountWithMeta[]>([]);

    const getAccounts = async () => {
        const extensions = await web3Enable("my cool dapp");
        if (extensions.length === 0) {
            return;
        }
        const allAccounts = await web3Accounts();
        setAllAccount(allAccounts);
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