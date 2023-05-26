import { CMS_API, CMS_LAST_CHANGES, EQUALS, FILTERS, OWNER_ADDRESS, POPULATE_ALL } from "@/constants/cms";
import { MAX_SHARE_PERCENTAGE, MIN_SHARE_PERCENTAGE } from "@/constants/contracts";
import { CATEGORY_KEY, DAYS_KEY, DESCRIPTION_KEY, EDIT_ID_KEY, RAISE_GOAL_KEY, SHARE_PERCENTAGE_KEY, TITLE_KEY } from "@/constants/general";
import { INVALID_SHARE_PERCENTAGE_MESSAGE } from "@/constants/messages";
import { SHIBUYA_ADDRESS } from "@/constants/polkadot";
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
    const putRes = await handleRequest(`${CMS_API}${CMS_LAST_CHANGES}/${editId}`, METHODS.PUT, {
      data: {
        [fieldKey]: value,
      }
    });
    if (putRes.data) {
      localStorage.setItem(fieldKey, value);
    }
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

export const getLastChanges = async () => {
  const { data = [] } = await handleRequest(
    `${CMS_API}${CMS_LAST_CHANGES}${POPULATE_ALL}&${FILTERS}[${OWNER_ADDRESS}][${EQUALS}]=${SHIBUYA_ADDRESS}`
    , METHODS.GET) ?? {};
  return data[0];
};

export const getLocalChanges = () => {
  const title = localStorage.getItem(TITLE_KEY) || "";
  const description = localStorage.getItem(DESCRIPTION_KEY) || "";
  const raiseGoal = localStorage.getItem(RAISE_GOAL_KEY) || "";
  const sharePercentage = localStorage.getItem(SHARE_PERCENTAGE_KEY) || "";
  const days = localStorage.getItem(DAYS_KEY) || "";
  const category = localStorage.getItem(CATEGORY_KEY) || "";
  const editId = Number(localStorage.getItem(EDIT_ID_KEY)) || 0;
  return {
    title,
    description,
    raiseGoal,
    sharePercentage,
    days,
    category,
    editId
  };
};

export const createNewEdit = async () => {
  try {
    const { data: { id } } = await handleRequest(`${CMS_API}${CMS_LAST_CHANGES}`, METHODS.POST, {
      data: {
        title: "",
        description: "",
        raiseGoal: 0,
        sharePercentage: 0,
        ownerAddress: SHIBUYA_ADDRESS,
        ownerName: "",
        raisedAmount: 0,
        days: 0,
        category: 1
      }
    });
    return id;
  } catch {
    return undefined;
  }
};
