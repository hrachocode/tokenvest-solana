import { CMS_API, CMS_LAST_CHANGES, POPULATE_ALL } from "@/constants/cms";
import { showNotification } from "@/utils/showNotification";
import { handleRequest, METHODS } from "@/utils/handleRequest";
import { ChangeEvent } from "react";

export const handleBlur = async (
  value: string,
  fieldKey: string,
  editId: number
) => {
  try {
    await handleRequest(
      `${process.env.NEXT_PUBLIC_CMS_URL}${CMS_API}${CMS_LAST_CHANGES}/${editId}`,
      METHODS.PUT,
      {
        data: {
          [fieldKey]: value,
        },
      }
    );
  } catch (error) {
    showNotification((error as { message: string }).message, "error");
  }
};

export const handleChange = (value: string, cb: Function) => {
  cb(value);
};

export const handleFileChange = (
  { target: { files = [] } = {} }: any,
  cb: Function
) => {
  cb(files);
};

export const handleChangeSelect = (
  event: ChangeEvent<HTMLSelectElement>,
  cb: Function,
  fieldKey: string,
  editId: number
) => {
  cb(event.target.value as string);
  handleBlur(event.target.value, fieldKey, editId);
};

export const getLastChanges = async () => {
  const { data = [] } =
    (await handleRequest(
      `${process.env.NEXT_PUBLIC_CMS_URL}${CMS_API}${CMS_LAST_CHANGES}${POPULATE_ALL}`,
      METHODS.GET
    )) ?? {};
  return data[0];
};

export const createNewChange = async () => {
  try {
    const {
      data: { id },
    } = await handleRequest(
      `${process.env.NEXT_PUBLIC_CMS_URL}${CMS_API}${CMS_LAST_CHANGES}`,
      METHODS.POST,
      {
        data: {
          title: "",
          description: "",
          raiseGoal: 0,
          ownerAddress: "",
          ownerName: "",
          raisedAmount: 0,
          days: 0,
          category: 1,
        },
      }
    );
    return id;
  } catch {
    return undefined;
  }
};
