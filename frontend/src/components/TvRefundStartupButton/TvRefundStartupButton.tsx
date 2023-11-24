import { REFUND } from "@/constants/general";
import { useSolana } from "@/hooks/useSolana";
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
  return <div>
    <TvButton animationBorderColor="#09202F" onClick={handleClick}>{REFUND}</TvButton>
  </div>;
};

export default TvRefundStartupButton;
