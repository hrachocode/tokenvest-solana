import { INITIALIZE } from "@/constants/general";
import { TvButton } from "../TvButton/TvButton";
import { useSolana } from "@/hooks/useSolana";
import { Dispatch, SetStateAction } from "react";
import { METHODS, handleRequest } from "@/utils/handleRequest";
import { CMS_API, CMS_PRODUCTS } from "@/constants/cms";

interface ITvInitializeButton {
    raiseGoal: string,
    sharePercentage: string,
    days: string,
    productId: string
    setIsDraftButton: Dispatch<SetStateAction<boolean>>
}

const TvInitializeButton = ({ raiseGoal, sharePercentage, days, productId, setIsDraftButton }: ITvInitializeButton): JSX.Element => {
  const { initialize } = useSolana();

  const handleClick = async () => {
    try {
      await initialize(
        raiseGoal, sharePercentage, days
      );
      const putRes = await handleRequest(`${CMS_API}${CMS_PRODUCTS}/${productId}`, METHODS.PUT, {
        data: {
          isDraft: false,
        }
      });
      if (putRes) {
        setIsDraftButton(false);
      }
    } catch (err) {
      alert(err);
    }

  };
  return <TvButton onClick={handleClick} customVariant="secondary">{INITIALIZE}</TvButton>;
};

export default TvInitializeButton;
