import { TvButton } from "@/components/TvButton/TvButton";
import { TvInput } from "@/components/TvInput/TvInput";
import { TvSelect } from "@/components/TvSelect/TvSelect";
import { CATEGORY_KEY, CREATE_PRODUCT_TEXT, DAYS_KEY, DESCRIPTION, DESCRIPTION_KEY, LABEL_CATEGORY, LABEL_DAYS, NAME, RAISE_GOAL, RAISE_GOAL_KEY, TITLE_KEY } from "@/constants/general";
import { selectOptions } from "@/constants/selectOptions";
import { useSmartInputs } from "@/hooks/useSmartInputs";
import { ICategory } from "@/interfaces/cmsinterace";
import { createProductCMS } from "@/utils/cmsUtils";
import { useEffect, useState } from "react";
import { handleBlur, handleChange, handleChangeSelect } from "./utils";
import { SOLANA_ACCOUNT_NAME } from "@/constants/solana";
import UploadImage from "../UploadImage/UploadImage";
import { useRouter } from "next/router";
import { PRODUCTS } from "@/constants/routes";
import StartCompaign from "../StartCompaign/StartCompaign";
import { showNotification } from "@/utils/showNotification";

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
    days, setDays,
    category, setCategory,
    editId
  } = useSmartInputs();
  const [ files, setFiles ] = useState([]);
  const [ productId, setProductId ] = useState<string | undefined>();
  const router = useRouter();

  const handleClick = async () => {
    try {
      await createProductCMS(
        SOLANA_ACCOUNT_NAME,
        name,
        description,
        raiseGoal,
        files[0],
        days,
        category,
        setProductId
      );
    } catch (error) {
      showNotification((error as { message: string }).message, "error");
    }
  };

  useEffect(() => {
    if (productId) {
      router.push(`${PRODUCTS}/${productId}`);
    }
  }, [ productId, router ]);

  return (
    <div className="secondaryFlex flex-col mt-[80px] md:mt-[214px] px-[20px] sm:px-[60px]">
      <StartCompaign />
      <div className="flex flex-col w-full md:w-[90%] p-[32px] mt-[80px] md:mt-[214px] rounded-[24px] bg-backgroundTertiary">
        <p className="text-[28px] sm:text-[32px] md:text-[48px] font-[500]">Project Information</p>
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
        <div className="flex justify-end my-[32px]">
          <TvButton animationBorderColor="#09202F" onClick={handleClick}>{CREATE_PRODUCT_TEXT}</TvButton>
        </div>
      </div>
    </div >
  );
};

export default CreateProduct;
