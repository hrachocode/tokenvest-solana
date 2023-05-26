import { TvButton } from "@/components/TvButton/TvButton";
import { TvInput } from "@/components/TvInput/TvInput";
import { TvSelect } from "@/components/TvSelect/TvSelect";
import { CMS_API, CMS_LAST_CHANGES, EQUALS, FILTERS, OWNER_ADDRESS, POPULATE_ALL } from "@/constants/cms";
import { CATEGORY, CATEGORY_KEY, CREATE_PRODUCT_TEXT, DAYS, DAYS_KEY, DESCRIPTION, DESCRIPTION_KEY, IMAGE, LABEL_CATEGORY, LABEL_DAYS, NAME, RAISE_GOAL, RAISE_GOAL_KEY, SHARE_PERCENTAGE, SHARE_PERCENTAGE_KEY, TITLE_KEY } from "@/constants/general";
import { SHIBUYA_ACCOUNT_NAME, SHIBUYA_ADDRESS } from "@/constants/polkadot";
import { selectOptions } from "@/constants/selectOptions";
import { ICategory } from "@/interfaces/cmsinterace";
import { createProductCMS } from "@/utils/cmsUtils";
import { handleRequest, METHODS } from "@/utils/handleRequest";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { styles } from "./CreateProduct.styles";
import { inputValidator, handleBlur, handleChange, handleFileChange, handleChangeSelect } from "./utils";

interface ICreateProduct {
  categories: ICategory[];
}

const CreateProduct = ({ categories }: ICreateProduct): JSX.Element => {

  useEffect(() => {
    (async () => {
      const { data = [] } = await handleRequest(
        `${CMS_API}${CMS_LAST_CHANGES}${POPULATE_ALL}&${FILTERS}[${OWNER_ADDRESS}][${EQUALS}]=${SHIBUYA_ADDRESS}`
        , METHODS.GET) ?? {};
      if (data.length !== 0) {
        setName(data[0].attributes.title);
        setDescription(data[0].attributes.description);
        setRaiseGoal(data[0].attributes.raiseGoal);
        setSharePercentage(data[0].attributes.sharePercentage);
        setDays(data[0].attributes.days);
        setCategory(data[0].attributes.category.data.id);
        setEditId(data[0].id);
      }

      // if (data.length === 0) {
      //   const postRes = await handleRequest(`${CMS_API}${CMS_LAST_CHANGES}`, METHODS.POST, {
      //     data: {
      //       title: "",
      //       description: "",
      //       raiseGoal: 0,
      //       sharePercentage: 0,
      //       ownerAddress: SHIBUYA_ADDRESS,
      //       ownerName: "",
      //       raisedAmount: 0,
      //       days: 0,
      //       category: 1
      //     }
      //   });
      //   const { data = [] } = await handleRequest(`${CMS_API}${CMS_LAST_CHANGES}${POPULATE_ALL}`, METHODS.GET) ?? {};
      //   console.log(data, "DATAAA ????");
      // }
    })();
  }, []);

  const selectCategories = categories.map((item: ICategory) => {
    return {
      name: item.title,
      value: Number(item.id)
    };
  });

  const [ name, setName ] = useState("");
  const [ description, setDescription ] = useState("");
  const [ raiseGoal, setRaiseGoal ] = useState("");
  const [ sharePercentage, setSharePercentage ] = useState("");
  const [ files, setFiles ] = useState([]);
  const [ days, setDays ] = useState("");
  const [ category, setCategory ] = useState("");
  const [ editId, setEditId ] = useState(0);

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
