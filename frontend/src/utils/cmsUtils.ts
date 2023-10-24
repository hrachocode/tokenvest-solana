import {
  CMS_API,
  CMS_PRODUCTS,
  CMS_PRODUCTS_REF,
  CMS_UPLOAD,
  DEFAULT_RAISED_AMOUNT,
  IMAGE_FIELD,
} from "@/constants/cms";
import { handleRequest, METHODS } from "./handleRequest";
import { Dispatch, SetStateAction } from "react";
import { getNotify } from "./getNotify";

export const createProductCMS = async (
  accountName: string,
  startupName: string,
  startupDescription: string,
  raiseGoal: string,
  imageFile: Blob,
  days: string,
  category: string,
  setProductId: Dispatch<SetStateAction<string | undefined>>
) => {
  try {
    const postRes = await handleRequest(
      `${process.env.NEXT_PUBLIC_CMS_URL}${CMS_API}${CMS_PRODUCTS}`,
      METHODS.POST,
      {
        data: {
          title: startupName,
          description: startupDescription,
          raiseGoal: raiseGoal,
          address: "",
          ownerAddress: "",
          ownerName: accountName,
          raisedAmount: DEFAULT_RAISED_AMOUNT,
          days: days,
          isComplete: false,
          isExpired: false,
          isDraft: true,
          isReady: false,
          category: category,
        },
      }
    );
    if (postRes?.data?.id) {
      const id = postRes.data.id;
      if (imageFile) {
        const formData = new FormData();
        formData.append("ref", CMS_PRODUCTS_REF);
        formData.append("refId", id);
        formData.append("field", IMAGE_FIELD);
        formData.append("files", imageFile);
        const postRes = await handleRequest(
          `${process.env.NEXT_PUBLIC_CMS_URL}${CMS_API}${CMS_UPLOAD}`,
          METHODS.POST,
          formData,
          true
        );
        if (postRes.length !== 0) {
          getNotify("Product successfully created!!!");
          setProductId(id);
        } else {
          getNotify("There was a problem with image", "error");
        }
      } else {
        getNotify("Product successfully created!!!");
      }
    }
  } catch (error) {
    getNotify((error as { message: string }).message, "error");
  }
};
