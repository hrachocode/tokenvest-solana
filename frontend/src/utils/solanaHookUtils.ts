import { CMS_API, CMS_NOTIFICATIONS, CMS_PRODUCTS } from "@/constants/cms";
import { METHODS, handleRequest } from "./handleRequest";
import { detectFractionalPart } from "./detectFractionalPartUtils";
import { Dispatch, SetStateAction } from "react";

export const solanaInvest = async (
  productId: string,
  investAmount: number,
  resRaisedAmount: string,
  setResRaisedAmount: Dispatch<SetStateAction<string>>,
  ownerAddress: string
) => {
  const { data } =
    (await handleRequest(
      `${CMS_API}${CMS_PRODUCTS}/${productId}`,
      METHODS.GET
    )) ?? {};

  if (data) {
    const raisedAmount = detectFractionalPart(
      Number(resRaisedAmount),
      investAmount
    );
    const putRes = await handleRequest(
      `${CMS_API}${CMS_PRODUCTS}/${productId}`,
      METHODS.PUT,
      {
        data: {
          raisedAmount: raisedAmount,
        },
      }
    );
    if (putRes.data) {
      await handleRequest(`${CMS_API}${CMS_NOTIFICATIONS}`, METHODS.POST, {
        data: {
          message: `Seat goal reached for product N: ${productId.toString()}`,
          address: ownerAddress,
          isOpened: false,
          productId: productId.toString(),
        },
      });
      alert(`Successfully invested ${investAmount}!!!`);
      setResRaisedAmount(raisedAmount);
    } else {
      alert("Something went wrong!!!");
    }
  }
};
