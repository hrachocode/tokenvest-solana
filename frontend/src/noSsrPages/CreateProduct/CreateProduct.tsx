import { TvButton } from "@/components/TvButton/TvButton";
import { TvInput } from "@/components/TvInput/TvInput";
import { SHIBUYA_ADDRESS } from "@/constants/polkadot";
import { usePolkadot } from "@/hooks/usePolkadot";
import { Box, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { styles } from "./CreateProduct.styles";

const CreateProduct = (): JSX.Element => {
    const [name, setName] = useState("");
    const [raiseGoal, setRaiseGoal] = useState("");
    const [sharePercentage, setSharePercentage] = useState("");
    const { deploy } = usePolkadot();

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, func: Function) => {
        func(e.target.value);
    };

    const handleClick = () => {
        deploy(SHIBUYA_ADDRESS, name, raiseGoal, sharePercentage);
    };

    return (
        <Box sx={styles.createProductWrapper}>
            <Box>
                <Typography>Name</Typography>
                <TvInput customVariant="tertiary" onChange={(e) => { handleChange(e, setName) }} />
            </Box>
            <Box>
                <Typography>Raise Goal</Typography>
                <TvInput customVariant="tertiary" onChange={(e) => { handleChange(e, setRaiseGoal) }} />
            </Box>
            <Box>
                <Typography>Share percentage</Typography>
                <TvInput customVariant="tertiary" onChange={(e) => { handleChange(e, setSharePercentage) }} />
            </Box>
            <Box>
                <TvButton onClick={handleClick}>Create Product</TvButton>
            </Box>
        </Box>
    )
};

export default CreateProduct;