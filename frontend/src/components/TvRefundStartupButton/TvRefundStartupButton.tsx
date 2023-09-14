import { styles } from "./TvRefundStartupButton.styles";
import { REFUND } from "@/constants/general";
import { useSolana } from "@/hooks/useSolana";
import { Box } from "@mui/material";
import { TvButton } from "../TvButton/TvButton";

interface ITvRefundStartupButton {
  productId: string,
}

const TvRefundStartupButton = ({
  productId,
}: ITvRefundStartupButton): JSX.Element => {
  const { refundStartup } = useSolana();

  const handleClick = () => {
    refundStartup(productId);
  };
  return <Box sx={styles.refundStartupBoxWrapper}>
    <TvButton onClick={handleClick} customVariant="secondary">{REFUND}</TvButton>
  </Box>;
};

export default TvRefundStartupButton;
