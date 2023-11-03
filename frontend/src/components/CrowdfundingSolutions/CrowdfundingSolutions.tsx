import Image from "next/image";
import { SolutionsData } from "@/constants/general";
import vector from "../../../public/images/vector1.png";
import TvPageCard from "../TvHomePageCard/TvHomePageCard";
import { useScroll } from "@/hooks/useScroll";

const CrowdfundingSolutions = () => {
  const { isVisible, animationRef } = useScroll();
  return (
    <section id="section-to" ref={animationRef} className='secondaryFlex  w-full flex-col relative text-center p-[90px_60px_145px_60px]'>
      {
        isVisible &&
        <div>
          <div className="relative animationDropDown">
            <p className='text-[26px] md:text-[32px] lg:text-[48px] font-[500]'>Tokenvest: Pioneering Web 3.0 Crowdfunding Solutions</p>
            <p className='text-[18px] text-textSecondary font-fontSecondary font-[400] pt-[20px]'>
              Discover how Tokenvest addresses these challenges and reimagines crowdfunding for the future.
            </p>
          </div>
          <div className="primaryFlex relative animationClimbUp flex-wrap lg:flex-nowrap gap-[10px] z-10">
            <TvPageCard cardData={SolutionsData} />
          </div>
        </div>
      }
      <div className='absolute right-0 top-0' >
        <Image alt='vector' src={vector} />
      </div>
    </section >
  );
};

export default CrowdfundingSolutions;
