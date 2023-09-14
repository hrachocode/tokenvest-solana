import { styles } from "./TvFinishStartupButton.styles";
import { FINISH } from "@/constants/general";
import { useSolana } from "@/hooks/useSolana";
import { Box } from "@mui/material";
import { TvButton } from "../TvButton/TvButton";

interface ITvFinishStartupButton {
  productId: string,
}
const TvFinishStartupButton = ({
  productId,
}: ITvFinishStartupButton): JSX.Element => {
  const { finishStartup } = useSolana();

  const handleClick = () => {
    finishStartup(productId);
  };
  return <Box sx={styles.finishStartupBoxWrapper}>
    <TvButton onClick={handleClick} customVariant="secondary">{FINISH}</TvButton>
  </Box>;
};

export default TvFinishStartupButton;
