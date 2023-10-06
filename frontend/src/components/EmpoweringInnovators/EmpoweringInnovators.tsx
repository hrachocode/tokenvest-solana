import Image from "next/image";
import { EmpoweringData } from "@/constants/general";
import vector from "../../../public/images/vector2.svg";
import InnovatingTechnology from "../InnovatingTechnology/InnovatingTechnology";
import TvPageCard from "../TvHomePageCard/TvHomePageCard";

const EmpoweringInnovators = () => {
  return (
    <section className="flex relative flex-col justify-center items-center pt-[200px]">
      <div>
        <p className="text-[48px] font-[500]">Empowering Innovators and Backers</p>
        <p className="text-[18px] font-[400] text-textSecondary font-fontSecondary text-center">
          Tokenvest caters to two essential user groups
        </p>
      </div>
      <div className="flex justify-center gap-[32px] pt-[32px] px-[10px]">
        <TvPageCard
          cardData={EmpoweringData}
          customVariant={{ pageCard: "secondaryHomePageCard", pageCardTitle: "secondaryHomePageCardTitle", pageCardDescription: "secondaryHomePageCardDescription" }}
        />
      </div>
      <InnovatingTechnology />
      <div className='absolute top-[140px] left-[-100px] w-[calc(100%_/_2.1)] 2xl:top-[50px]' >
        <Image alt='vector' src={vector} />
      </div>
    </section>
  );
};

export default EmpoweringInnovators;
