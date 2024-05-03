import { TvButton } from "@/components/TvButton/TvButton";
import { TvInput } from "@/components/TvInput/TvInput";
import { CREATE_PRODUCT_TEXT } from "@/constants/general";
import { useSmartInputs } from "@/hooks/useSmartInputs";
import { ICategory } from "@/interfaces/cmsinterace";
import { handleChange } from "./utils";
import StartCompaign from "../StartCompaign/StartCompaign";
import { showNotification } from "@/utils/showNotification";
import { useRouter } from "next/router";
import { HOME } from "@/constants/routes";

interface ICreateProduct {
  categories: ICategory[];
}

const CreateProduct = ({ categories }: ICreateProduct): JSX.Element => {
  const router = useRouter();

  const {
    name, setName,
    projectName, setProjectName,
    projectDescription, setProjectDescription,
    contact, setContact
  } = useSmartInputs();

  const handleClick = async () => {
    try {
      const formData = {
        name,
        projectName,
        projectDescription,
        contact
      };

      const response = await fetch("/api/send-grid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        showNotification("Form data submitted successfully");
        router.push(`${HOME}`);
      } else {
        console.error("Failed to submit form data");
      }
    } catch (error) {
      console.error("An error occurred while submitting form data:", error);
    }
  };

  return (
    <div className="secondaryFlex flex-col mt-[80px] md:mt-[214px] px-[20px] sm:px-[60px]">
      <StartCompaign />
      <div className="flex flex-col w-full md:w-[90%] p-[32px] mt-[80px] md:mt-[214px] rounded-[24px] bg-backgroundTertiary">
        <p className="text-[28px] sm:text-[32px] md:text-[48px] font-[500]">Project Information</p>
        <TvInput
          value={name}
          labelName="Name"
          onChange={({ target: { value = "" } = {} }) => { handleChange(value, setName); }}
        />
        <TvInput
          value={projectName}
          labelName="Project Name"
          onChange={({ target: { value = "" } = {} }) => { handleChange(value, setProjectName); }}
        />
        <TvInput
          value={projectDescription}
          labelName="Project Description"
          isTextArea
          onChange={({ target: { value = "" } = {} }) => { handleChange(value, setProjectDescription); }}
        />
        <TvInput
          value={contact}
          labelName="How To Contact"
          onChange={({ target: { value = "" } = {} }) => { handleChange(value, setContact); }}
        />
        <div className="flex justify-end my-[32px]">
          <TvButton animationBorderColor="#09202F" onClick={handleClick}>{CREATE_PRODUCT_TEXT}</TvButton>
        </div>
      </div>
    </div >
  );
};

export default CreateProduct;
