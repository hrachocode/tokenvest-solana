import { TvButton } from "@/components/TvButton/TvButton";
import { TvInput } from "@/components/TvInput/TvInput";
import { TvSelect } from "@/components/TvSelect/TvSelect";
import { LABEL_DAYS } from "@/constants/general";
import { SHIBUYA_ACCOUNT_NAME, SHIBUYA_ADDRESS } from "@/constants/polkadot";
import { selectOptions } from "@/constants/selectOptions";
import { usePolkadot } from "@/hooks/usePolkadot";
import { Box, SelectChangeEvent, Typography } from "@mui/material";
import { useState } from "react";
import { styles } from "./CreateProduct.styles";
import { inputValidator } from "./utils";

const CreateProduct = (): JSX.Element => {
  const [ name, setName ] = useState("");
  const [ description, setDescription ] = useState("");
  const [ raiseGoal, setRaiseGoal ] = useState("");
  const [ sharePercentage, setSharePercentage ] = useState("");
  const [ files, setFiles ] = useState([]);
  const [ days, setDays ] = useState("");

  const { deploy } = usePolkadot();

  const handleChange = (value: string, cb: Function) => {
    cb(value);
  };

  const handleFileChange = ({ target: { files = [] } = {} }: any) => {
    setFiles(files);
  };

  const handleChangeDays = (event: SelectChangeEvent) => {
    setDays(event.target.value as string);
  };

  const handleClick = async () => {
    const { success = false, message = "" } = inputValidator(sharePercentage) ?? {};
    if (success) {
      await deploy(SHIBUYA_ACCOUNT_NAME, SHIBUYA_ADDRESS, name, description, raiseGoal, sharePercentage, files[0], days);
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
        <Typography>Description</Typography>
        <TvInput customVariant="tertiary" onChange={({ target: { value = "" } = {} }) => { handleChange(value, setDescription); }} />
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
        <Typography>Days</Typography>
        <Box sx={styles.selectWrapper}>
          <TvSelect label={LABEL_DAYS} value={days} handleChange={handleChangeDays} selectOptions={selectOptions} />
        </Box>
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
