import { INVEST, INVEST_BOX_CAPTION } from "@/constants/general";
import { SHIBUYA_ADDRESS } from "@/constants/polkadot";
import { usePolkadot } from "@/hooks/usePolkadot";
import { Box, Typography } from "@mui/material";
import { MouseEvent, useState } from "react";
import { TvButton } from "../TvButton/TvButton";
import { TvInput } from "../TvInput/TvInput";
import { styles } from "./TvInvestBox.styles";

interface ITvInvestBox {
  contractAddress: string;
  productId: string;
  ownerAddress: string;
  raiseGoal: string;
}

const TvInvestBox = ({ contractAddress, productId, ownerAddress, raiseGoal }: ITvInvestBox): JSX.Element => {

  const { invest } = usePolkadot();

  const [ investAmount, setInvestAmount ] = useState(0);

  const handleChange = (value: string, cb: Function) => {
    cb(value);
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleClick = () => {
    invest(SHIBUYA_ADDRESS, investAmount, contractAddress, productId, ownerAddress, raiseGoal);
  };

  return (
    <Box sx={styles.investBoxWrapper} onMouseDown={handleMouseDown}>
      <Typography variant="caption" color="caption">{INVEST_BOX_CAPTION}</Typography>
      <TvInput
        type="number"
        customVariant="tertiary"
        onChange={({ target: { value = "" } = {} }) => { handleChange(value, setInvestAmount); }}
      />
      <TvButton customVariant="secondary" onClick={handleClick}>{INVEST}</TvButton>
    </Box>
  );
};

export default TvInvestBox;
