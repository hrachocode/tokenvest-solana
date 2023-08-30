import { WITHDRAW } from "@/constants/general";
import { TvButton } from "../TvButton/TvButton";
import { useSolana } from "@/hooks/useSolana";
import { styles } from "./TvWithdrawButton.styles";
import { Box } from "@mui/material";

const TvInitializeButton = (): JSX.Element => {
  const { withdraw } = useSolana();

  const handleClick = () => {
    withdraw();
  };
  return <Box sx={styles.withdrawBoxWrapper}>
    <TvButton onClick={handleClick} customVariant="secondary">{WITHDRAW}</TvButton>
  </Box>;
};

export default TvInitializeButton;
