import { MAX_SHARE_PERCENTAGE, MIN_SHARE_PERCENTAGE } from "@/constants/contracts";
import { INVALID_SHARE_PERCENTAGE_MESSAGE } from "@/constants/messages";

export const inputValidator = (sharePercentage: string) => {
  if (Number(sharePercentage) > MAX_SHARE_PERCENTAGE || Number(sharePercentage) < MIN_SHARE_PERCENTAGE) {
    return {
      success: false,
      message: INVALID_SHARE_PERCENTAGE_MESSAGE
    };
  } else {
    return {
      success: true
    };
  }
};
