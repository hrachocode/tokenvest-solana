import {
  CMS_API,
  CMS_PRODUCTS,
  CMS_PRODUCTS_REF,
  CMS_UPLOAD,
  DEFAULT_RAISED_AMOUNT,
  IMAGE_FIELD,
} from "@/constants/cms";
import { handleRequest, METHODS } from "./handleRequest";

export const createProductCMS = async (
  accountName: string,
  startupName: string,
  startupDescription: string,
  raiseGoal: string,
  imageFile: Blob,
  days: string,
  category: string
) => {
  try {
    const postRes = await handleRequest(
      `${CMS_API}${CMS_PRODUCTS}`,
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
          `${CMS_API}${CMS_UPLOAD}`,
          METHODS.POST,
          formData,
          true
        );
        if (postRes.length !== 0) {
          alert("Product successfully created!!!");
        } else {
          alert("There was a problem with image");
        }
      } else {
        alert("Product successfully created!!!");
      }
    }
  } catch (error) {
    alert((error as { message: string }).message);
  }
};
