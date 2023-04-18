import { TvButton } from "@/components/TvButton/TvButton";
import { TvInput } from "@/components/TvInput/TvInput";
import { SHIBUYA_ADDRESS } from "@/constants/polkadot";
import { usePolkadot } from "@/hooks/usePolkadot";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { styles } from "./CreateProduct.styles";
import { inputValidator } from "./utils";

const CreateProduct = (): JSX.Element => {
  const [ name, setName ] = useState("");
  const [ raiseGoal, setRaiseGoal ] = useState("");
  const [ sharePercentage, setSharePercentage ] = useState("");
  const [ files, setFiles ] = useState([]);
  const { deploy } = usePolkadot();

  const handleChange = (value: string, cb: Function) => {
    cb(value);
  };

  const handleFileChange = ({ target: { files = [] } = {} }: any) => {
    setFiles(files);
  };

  const handleClick = async () => {
    const { success = false, message = "" } = inputValidator(sharePercentage) ?? {};
    if (success) {
      await deploy(SHIBUYA_ADDRESS, name, raiseGoal, sharePercentage, files[0]);
    } else {
      alert(message);
    }

  };

  return (
    <Box sx={styles.createProductWrapper}>
      <Box>
        <Typography>Name</Typography>
        <TvInput customVariant="tertiary" onChange={({ target: { value = "" } = {} }) => { handleChange(value, setName); }} />
      </Box>
      <Box>
        <Typography>Raise Goal</Typography>
        <TvInput type="number" customVariant="tertiary" onChange={({ target: { value = "" } = {} }) => { handleChange(value, setRaiseGoal); }} />
      </Box>
      <Box>
        <Typography>Share percentage</Typography>
        <TvInput type="number" customVariant="tertiary" onChange={({ target: { value = "" } = {} }) => { handleChange(value, setSharePercentage); }} />
      </Box>
      <Box>
        <Typography>Image</Typography>
        <TvInput type="file" customVariant="tertiary" onChange={handleFileChange} />
      </Box>
      <Box>
        <TvButton onClick={handleClick}>Create Product</TvButton>
      </Box>
    </Box>
  );
};

export default CreateProduct;
