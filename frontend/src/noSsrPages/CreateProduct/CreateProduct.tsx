import { TvButton } from "@/components/TvButton/TvButton";
import { SHIBUYA_ADDRESS } from "@/constants/polkadot";
import { usePolkadot } from "@/hooks/usePolkadot";
import { Box } from "@mui/material";

const CreateProduct = (): JSX.Element => {
    const { deploy } = usePolkadot();
    return (
        <Box>
            <TvButton onClick={() => { deploy(SHIBUYA_ADDRESS, "test2", "200", "20"); }}>DEPLOY</TvButton>
        </Box>
    )
};

export default CreateProduct;