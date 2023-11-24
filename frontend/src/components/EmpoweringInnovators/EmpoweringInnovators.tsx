import { EmpoweringData } from "@/constants/general";
import TvPageCard from "../TvHomePageCard/TvHomePageCard";
import { useScroll } from "@/hooks/useScroll";
import ParticlesCanvas from "../ParticlesCanvas/ParticlesCanvas";

const EmpoweringInnovators = () => {
  const { isVisible, animationRef } = useScroll();
  return (
    <section ref={animationRef} className="relative p-[80px_60px] md:pt-[200px]">
      {
        isVisible &&
        <div>
          <div className="relative text-center animationDropDown">
            <p className="text-[32px] lg:text-[40px] 2xl:text-[48px] font-[500]">Empowering Innovators and Backers</p>
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
      <ParticlesCanvas width="18%" left="0" top="280px" id="particlesInnovators" />
    </section>
  );
};

export default EmpoweringInnovators;
