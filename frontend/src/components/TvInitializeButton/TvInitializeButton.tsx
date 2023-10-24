import { INITIALIZE } from "@/constants/general";
import { TvButton } from "../TvButton/TvButton";
import { useSolana } from "@/hooks/useSolana";
import { Dispatch, SetStateAction } from "react";
import { METHODS, handleRequest } from "@/utils/handleRequest";
import { CMS_API, CMS_PRODUCTS } from "@/constants/cms";
import { getNotify } from "@/utils/getNotify";

interface ITvInitializeButton {
  raiseGoal: string,
  days: string,
  productId: string,
  setIsDraftButton: Dispatch<SetStateAction<boolean>>
}

const TvInitializeButton = ({
  raiseGoal,
  days,
  productId,
  setIsDraftButton
}: ITvInitializeButton): JSX.Element => {
  const { initialize } = useSolana();

  const handleClick = async () => {
    try {
      await initialize(
        raiseGoal, days, productId
      );
      const putRes = await handleRequest(`${process.env.NEXT_PUBLIC_CMS_URL}${CMS_API}${CMS_PRODUCTS}/${productId}`, METHODS.PUT, {
        data: {
          isDraft: false,
        }
      });
      if (putRes) {
        setIsDraftButton(false);
      }
    } catch (error) {
      getNotify((error as { message: string }).message, "error");
    }

  };
  return <TvButton onClick={handleClick}>{INITIALIZE}</TvButton>;
};

export default TvInitializeButton;
