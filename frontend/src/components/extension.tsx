import { Box, Button, Typography } from "@mui/material";
import { usePolkadot } from "@/hooks/usePolkadot";
import { Fragment } from "react";
import { SAMPLE_ADDRESS } from "@/constants/polkadot";

const Extension = () => {
    const { allAccount, sendTransaction } = usePolkadot();

    return (
        <>
            <Box>
                {typeof allAccount !== "undefined"
                    ? allAccount.map((account: any, index: number) => {
                        return (
                            <Fragment key={index + 1}>
                                <Box>
                                    <Typography>Account name: {account.meta.name}</Typography>
                                    <Typography>Account address: {account.address}</Typography>
                                </Box>
                                <Button onClick={() => { sendTransaction(account.address, SAMPLE_ADDRESS) }}>send transaction</Button>
                            </Fragment>
                        );
                    })
                    : <></>}
            </Box>
        </>
    );
};

export default Extension;