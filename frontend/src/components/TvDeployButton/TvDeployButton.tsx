import { DEPLOY } from "@/constants/general";
import { SHIBUYA_ADDRESS } from "@/constants/polkadot";
import { usePolkadot } from "@/hooks/usePolkadot";
import { TvButton } from "../TvButton/TvButton";

interface ITvDeployButton {
    raiseGoal: string,
    sharePercentage: string,
    days: string,
    productId: string
}

const TvDeployButton = ({ raiseGoal, sharePercentage, days, productId }: ITvDeployButton): JSX.Element => {
    const { deploy } = usePolkadot();

    const handleClick = () => {
        deploy(
            SHIBUYA_ADDRESS,
            raiseGoal,
            sharePercentage,
            days,
            productId
        )
    }

    return <TvButton onClick={handleClick} customVariant="secondary">{DEPLOY}</TvButton>
};

export default TvDeployButton;
