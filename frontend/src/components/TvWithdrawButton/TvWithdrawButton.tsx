import { WITHDRAW } from "@/constants/general";
import { TvButton } from "../TvButton/TvButton";
import { useSolana } from "@/hooks/useSolana";

const TvInitializeButton = (): JSX.Element => {
  const { withdraw } = useSolana();

  const handleClick = () => {
    withdraw();
  };
  return <TvButton onClick={handleClick} customVariant="secondary">{WITHDRAW}</TvButton>;
};

export default TvInitializeButton;
