import { Box, Button, Input, Typography } from "@mui/material";
import { usePolkadot } from "@/hooks/usePolkadot";
import { useState } from "react";
import { SHIBUYA_ADDRESS } from "@/constants/polkadot";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";

const Extension = () => {
    const [proposal, setProposal] = useState({});
    const { allAccounts, invest, withdraw, deploy } = usePolkadot();

    const bufferToHex = (buffer: any) => {
        return Array.from(new Uint8Array(buffer))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('')
    };


    const handleFileChosen = (file: any) => {
        const fileReader = new FileReader()
        fileReader.onloadend = e => {
            const content = bufferToHex(fileReader.result)
            setProposal(`0x${content}`)
        };

        fileReader.readAsArrayBuffer(file);
    };

    return (
        <>
            <Box sx={{
                display: "flex",
                flexDirection: "column"
            }}>
                {typeof allAccounts !== "undefined"
                    ? allAccounts.map((account: InjectedAccountWithMeta, index: number) => {
                        return (
                            <Box key={index + 1}>
                                <Box>
                                    <Typography>Account name: {account.meta.name}</Typography>
                                    <Typography>Account address: {account.address}</Typography>
                                </Box>
                                <Button onClick={() => { invest(SHIBUYA_ADDRESS, 1) }}>invest</Button>
                                <Button onClick={() => { withdraw(SHIBUYA_ADDRESS) }}>withdraw</Button>
                            </Box>
                        );
                    })
                    : <></>}
                <Box>
                    <Input
                        type="file"
                        id="file"
                        onChange={(e: any) => handleFileChosen(e.target.files[0])}
                    />
                    <Button onClick={() => { deploy(SHIBUYA_ADDRESS, proposal) }}>deploy</Button>
                </Box>
            </Box>
        </>
    );
};

export default Extension;