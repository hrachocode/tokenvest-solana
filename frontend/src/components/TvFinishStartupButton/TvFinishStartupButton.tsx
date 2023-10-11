import { FINISH } from "@/constants/general";
import { useSolana } from "@/hooks/useSolana";
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
  return <div>
    <TvButton onClick={handleClick}>{FINISH}</TvButton>
  </div>;
};

export default TvFinishStartupButton;
