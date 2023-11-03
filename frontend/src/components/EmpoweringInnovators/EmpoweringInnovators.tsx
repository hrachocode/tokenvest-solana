import Image from "next/image";
import { EmpoweringData } from "@/constants/general";
import vector from "../../../public/images/vector2.png";
import TvPageCard from "../TvHomePageCard/TvHomePageCard";
import { useScroll } from "@/hooks/useScroll";

const EmpoweringInnovators = () => {
  const { isVisible, animationRef } = useScroll();
  return (
    <section ref={animationRef} className="relative p-[80px_60px] md:pt-[200px]">
      {
        isVisible &&
        <div>
          <div className="relative text-center animationDropDown">
            <p className="text-[32px] lg:text-[48px] font-[500]">Empowering Innovators and Backers</p>
            <p className="text-textSecondary font-fontSecondary text-center text-[18px] font-[400]">
              Tokenvest caters to two essential user groups
            </p>
          </div>
          <div className="primaryFlex relative animationClimbUp flex-wrap gap-[32px] p-[32px_10px]" >
            <TvPageCard
              cardData={EmpoweringData}
              customVariant={{ pageCard: "secondaryHomePageCard", pageCardTitle: "secondaryHomePageCardTitle", pageCardDescription: "secondaryHomePageCardDescription" }}
            />
          </div>
        </div>
      }
      <div className='absolute top-[140px] left-0 lg:left-[-100px] w-[calc(100%_/_2.1)] 2xl:top-[50px]' >
        <Image alt='vector' src={vector} />
      </div>
    </section>
  );
};

export default EmpoweringInnovators;
