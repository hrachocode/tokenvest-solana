import { INITIALIZE } from "@/constants/general";
import { TvButton } from "../TvButton/TvButton";
import { useSolana } from "@/hooks/useSolana";

interface ITvInitializeButton {
    raiseGoal: string,
    sharePercentage: string,
    days: string,
    productId: string
}

const TvInitializeButton = ({ raiseGoal, sharePercentage, days, productId }: ITvInitializeButton): JSX.Element => {
    const { initialize } = useSolana();

    const handleClick = () => {
        initialize(
            raiseGoal, sharePercentage, days
        );
    };

    return <TvButton onClick={handleClick} customVariant="secondary">{INITIALIZE}</TvButton>;
};

export default TvInitializeButton;