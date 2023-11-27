import { SolutionsData } from "@/constants/general";
import TvPageCard from "../TvHomePageCard/TvHomePageCard";
import { useScroll } from "@/hooks/useScroll";
import ParticlesCanvas from "../ParticlesCanvas/ParticlesCanvas";

const CrowdfundingSolutions = () => {
  const { isVisible, animationRef } = useScroll();
  return (
    <section id="section-to" ref={animationRef} className='secondaryFlex w-full flex-col relative text-center p-[90px_60px_145px_60px]'>
      {
        isVisible &&
        <div className="z-50">
          <div className="relative animationDropDown">
            <p className='text-[26px] lg:text-[40px] 2xl:text-[48px] font-[500]'>Tokenvest: Pioneering Web 3.0 Crowdfunding Solutions</p>
            <p className='text-[18px] text-textSecondary font-fontSecondary font-[400] pt-[20px]'>
              Discover how Tokenvest addresses these challenges and reimagines crowdfunding for the future.
            </p>
          </div>
          <div className="primaryFlex relative animationClimbUp mt-[32px] z-10">
            <TvPageCard cardData={SolutionsData} />
          </div>
          <ParticlesCanvas width="25%" right="0" top="0" id="particlesSolutions" />
        </div>
      }
    </section >
  );
};

export default CrowdfundingSolutions;
