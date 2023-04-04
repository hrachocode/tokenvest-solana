import { Box, Button, Typography } from "@mui/material";
import { usePolkadot } from "@/hooks/usePolkadot";
import { Fragment } from "react";
import { SHIBUYA_ADDRESS } from "@/constants/polkadot";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";

const Extension = () => {
    const { allAccounts, invest, withdraw } = usePolkadot();

    return (
        <>
            <Box>
                {typeof allAccounts !== "undefined"
                    ? allAccounts.map((account: InjectedAccountWithMeta, index: number) => {
                        return (
                            <Fragment key={index + 1}>
                                <Box>
                                    <Typography>Account name: {account.meta.name}</Typography>
                                    <Typography>Account address: {account.address}</Typography>
                                </Box>
                                <Button onClick={() => { invest(SHIBUYA_ADDRESS, 1) }}>invest</Button>
                                <Button onClick={() => { withdraw(SHIBUYA_ADDRESS) }}>withdraw</Button>
                            </Fragment>
                        );
                    })
                    : <></>}
            </Box>
        </>
    );
};

export default Extension;