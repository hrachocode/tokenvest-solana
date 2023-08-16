import { TvButton } from "@/components/TvButton/TvButton";
import { TvInput } from "@/components/TvInput/TvInput";
import { TvSelect } from "@/components/TvSelect/TvSelect";
import { CATEGORY, CATEGORY_KEY, CREATE_PRODUCT_TEXT, DAYS, DAYS_KEY, DESCRIPTION, DESCRIPTION_KEY, IMAGE, LABEL_CATEGORY, LABEL_DAYS, NAME, RAISE_GOAL, RAISE_GOAL_KEY, SHARE_PERCENTAGE, SHARE_PERCENTAGE_KEY, TITLE_KEY } from "@/constants/general";
import { SHIBUYA_ACCOUNT_NAME, SHIBUYA_ADDRESS } from "@/constants/polkadot";
import { selectOptions } from "@/constants/selectOptions";
import { useSmartInputs } from "@/hooks/useSmartInputs";
import { ICategory } from "@/interfaces/cmsinterace";
import { createProductCMS } from "@/utils/cmsUtils";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { styles } from "./CreateProduct.styles";
import { inputValidator, handleBlur, handleChange, handleFileChange, handleChangeSelect } from "./utils";

interface ICreateProduct {
  categories: ICategory[];
}

const CreateProduct = ({ categories }: ICreateProduct): JSX.Element => {

  const selectCategories = categories.map((item: ICategory) => {
    return {
      name: item.title,
      value: Number(item.id)
    };
  });

  const {
    name, setName,
    description, setDescription,
    raiseGoal, setRaiseGoal,
    sharePercentage, setSharePercentage,
    days, setDays,
    category, setCategory,
    editId
  } = useSmartInputs();
  const [ files, setFiles ] = useState([]);

  const handleClick = async () => {
    const { success = false, message = "" } = inputValidator(sharePercentage) ?? {};
    if (success) {
      await createProductCMS(
        SHIBUYA_ACCOUNT_NAME,
        SHIBUYA_ADDRESS, name,
        description,
        raiseGoal,
        sharePercentage,
        files[0],
        days,
        category);
    } else {
      alert(message);
    };

  };
  return (
    <Box sx={styles.createProductWrapper}>
      <Box>
        <Typography>{NAME}</Typography>
        <TvInput
          value={name}
          customVariant="tertiary"
          onChange={({ target: { value = "" } = {} }) => { handleChange(value, setName); }}
          onBlur={({ target: { value = "" } = {} }) => { handleBlur(value, TITLE_KEY, editId); }}
        />
      </Box>
      <Box>
        <Typography>{DESCRIPTION}</Typography>
        <TvInput
          value={description}
          customVariant="tertiary"
          onChange={({ target: { value = "" } = {} }) => { handleChange(value, setDescription); }}
          onBlur={({ target: { value = "" } = {} }) => { handleBlur(value, DESCRIPTION_KEY, editId); }}
        />
      </Box>
      <Box>
        <Typography>{RAISE_GOAL}</Typography>
        <TvInput
          value={raiseGoal}
          type="number"
          customVariant="tertiary"
          onChange={({ target: { value = "" } = {} }) => { handleChange(value, setRaiseGoal); }}
          onBlur={({ target: { value = "" } = {} }) => { handleBlur(value, RAISE_GOAL_KEY, editId); }}
        />
      </Box>
      <Box>
        <Typography>{SHARE_PERCENTAGE}</Typography>
        <TvInput
          value={sharePercentage}
          type="number"
          customVariant="tertiary"
          onChange={({ target: { value = "" } = {} }) => { handleChange(value, setSharePercentage); }}
          onBlur={({ target: { value = "" } = {} }) => { handleBlur(value, SHARE_PERCENTAGE_KEY, editId); }}
        />
      </Box>
      <Box>
        <Typography>{DAYS}</Typography>
        <Box sx={styles.selectWrapper}>
          <TvSelect
            label={LABEL_DAYS}
            value={days}
            handleChange={(e) => { handleChangeSelect(e, setDays, DAYS_KEY, editId); }}
            selectOptions={selectOptions} />
        </Box>
      </Box>
      <Box>
        <Typography>{CATEGORY}</Typography>
        <Box sx={styles.selectWrapper}>
          <TvSelect
            label={LABEL_CATEGORY}
            value={category}
            handleChange={(e) => { handleChangeSelect(e, setCategory, CATEGORY_KEY, editId); }}
            selectOptions={selectCategories} />
        </Box>
      </Box>
      <Box>
        <Typography>{IMAGE}</Typography>
        <TvInput type="file" customVariant="tertiary" onChange={(e) => handleFileChange(e, setFiles)} />
      </Box>
      <Box>
        <TvButton onClick={handleClick}>{CREATE_PRODUCT_TEXT}</TvButton>
      </Box>
    </Box>
  );
};

export default CreateProduct;
