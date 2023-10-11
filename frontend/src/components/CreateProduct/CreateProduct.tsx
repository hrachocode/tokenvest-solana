import { TvButton } from "@/components/TvButton/TvButton";
import { TvInput } from "@/components/TvInput/TvInput";
import { TvSelect } from "@/components/TvSelect/TvSelect";
import { CATEGORY_KEY, CREATE_PRODUCT_TEXT, DAYS_KEY, DESCRIPTION, DESCRIPTION_KEY, LABEL_CATEGORY, LABEL_DAYS, NAME, RAISE_GOAL, RAISE_GOAL_KEY, SHARE_PERCENTAGE, SHARE_PERCENTAGE_KEY, TITLE_KEY } from "@/constants/general";
import { selectOptions } from "@/constants/selectOptions";
import { useSmartInputs } from "@/hooks/useSmartInputs";
import { ICategory } from "@/interfaces/cmsinterace";
import { createProductCMS } from "@/utils/cmsUtils";
import { useState } from "react";
import { inputValidator, handleBlur, handleChange, handleChangeSelect } from "./utils";
import { SOLANA_ACCOUNT_NAME } from "@/constants/solana";
import UploadImage from "../UploadImage/UploadImage";

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
        SOLANA_ACCOUNT_NAME,
        name,
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
    <div className="flex flex-col justify-center items-center mt-[214px]">
      <div className="flex flex-col items-center">
        <h1 className="font-[600]">
          Start Your <span className="text-textPrimary">Campaign</span>
        </h1>
        <div className="max-w-[70%]">
          <p className="text-center text-textSecondary font-fontSecondary text-[26px] font-[300]">
            Welcome to the project creation process. We&apos;re excited to help you bring your innovative idea to life.
            Fill the fields below to add your project to Tokenvest.
          </p>
        </div>
      </div>
      <div className="flex flex-col max-w-[1100px] w-full p-[32px] rounded-[24px] bg-backgroundTertiary mt-[214px]">
        <p className="text-[48px] font-[500]">Project Information</p>
        <TvInput
          value={name}
          labelName={NAME}
          onChange={({ target: { value = "" } = {} }) => { handleChange(value, setName); }}
          onBlur={({ target: { value = "" } = {} }) => { handleBlur(value, TITLE_KEY, editId); }}
        />
        <TvInput
          value={description}
          labelName={DESCRIPTION}
          customVariant="secondaryInput"
          onChange={({ target: { value = "" } = {} }) => { handleChange(value, setDescription); }}
          onBlur={({ target: { value = "" } = {} }) => { handleBlur(value, DESCRIPTION_KEY, editId); }}
        />
        <TvInput
          value={raiseGoal}
          labelName={RAISE_GOAL}
          type="number"
          onChange={({ target: { value = "" } = {} }) => { handleChange(value, setRaiseGoal); }}
          onBlur={({ target: { value = "" } = {} }) => { handleBlur(value, RAISE_GOAL_KEY, editId); }}
        />
        <TvInput
          value={sharePercentage}
          labelName={SHARE_PERCENTAGE}
          type="number"
          onChange={({ target: { value = "" } = {} }) => { handleChange(value, setSharePercentage); }}
          onBlur={({ target: { value = "" } = {} }) => { handleBlur(value, SHARE_PERCENTAGE_KEY, editId); }}
        />
        <TvSelect
          value={days}
          labelName={LABEL_DAYS}
          addIcon={true}
          handleChange={(e) => { handleChangeSelect(e, setDays, DAYS_KEY, editId); }}
          selectOptions={selectOptions} />
        <TvSelect
          labelName={LABEL_CATEGORY}
          value={category}
          customVariant="secondarySelect"
          handleChange={(e) => { handleChangeSelect(e, setCategory, CATEGORY_KEY, editId); }}
          selectOptions={selectCategories} />
        <UploadImage setFiles={setFiles} />
        <div className="text-end my-[32px]">
          <TvButton onClick={handleClick}>{CREATE_PRODUCT_TEXT}</TvButton>
        </div>
      </div>
    </div >
  );
};

export default CreateProduct;
