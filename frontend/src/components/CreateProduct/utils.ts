import { CMS_API, CMS_LAST_CHANGES } from "@/constants/cms";
import { MAX_SHARE_PERCENTAGE, MIN_SHARE_PERCENTAGE } from "@/constants/contracts";
import { INVALID_SHARE_PERCENTAGE_MESSAGE } from "@/constants/messages";
import { handleRequest, METHODS } from "@/utils/handleRequest";
import { SelectChangeEvent } from "@mui/material";

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

export const handleBlur = async (value: string, fieldKey: string, editId: number) => {
  try {
    await handleRequest(`${CMS_API}${CMS_LAST_CHANGES}/${editId}`, METHODS.PUT, {
      data: {
        [fieldKey]: value,
      }
    });
  } catch (error) {
    alert(error);
  }
};

export const handleChange = (value: string, cb: Function) => {
  cb(value);
};

export const handleFileChange = ({ target: { files = [] } = {} }: any, cb: Function) => {
  cb(files);
};

export const handleChangeSelect = (event: SelectChangeEvent, cb: Function, fieldKey: string, editId: number) => {
  cb(event.target.value as string);
  handleBlur(event.target.value, fieldKey, editId);
};
