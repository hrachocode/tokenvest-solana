import { TvButton } from "../TvButton/TvButton";
import Link from "next/link";
import { CREATE_PRODUCT } from "@/constants/routes";
import { useScroll } from "@/hooks/useScroll";
import ParticlesCanvas from "../ParticlesCanvas/ParticlesCanvas";
import { CMS_PRODUCTS } from "@/constants/cms";
interface IReadyGetStartedProps {
  title: string,
  background?: string,
}

const ReadyGetStarted = (props: IReadyGetStartedProps): JSX.Element => {
  const { title, background = "readyGetStartedPrimary" } = props;
  const { isVisible, animationRef } = useScroll();
  return (
    <section ref={animationRef} className="secondaryFlex w-full relative mt-[60px] md:mt-[200px]">
      {
        isVisible &&
        <div className={`secondaryFlex flex-col ${background} rounded-[20px] w-[90%] z-50`}>
          <div className="relative max-w-[655px] w-full text-center pt-[64px] lg:pt-[100px] animationDropDown">
            <p className="text-[32px] lg:text-[40px] 2xl:text-[48px] font-[500]">{title}</p>
            <p className="text-[18px] lg:text-[22px] text-textSecondary font-fontSecondary font-[400]">
              Join Tokenvest and be part of a new era in crowdfunding.
              Explore campaigns, back projects, or launch your own today.
            </p>
          </div>
          <div className="secondaryFlex flex-col sm:flex-row p-[32px_0_64px_0] md:p-[32px_0_100px_0] gap-[12px] md:gap-[32px]">
            <Link href={CREATE_PRODUCT} className="relative animationLeftToRight">
              <TvButton>Add Projects</TvButton>
            </Link>
            <div className="relative animationRightToLeft">
              <Link href={CMS_PRODUCTS}>
                <TvButton customVariant="secondaryButton" animationCustomVariant="animationSecondaryButton">Explore Projects</TvButton>
              </Link>
            </div>
          </div>
        </div>
      }
      <ParticlesCanvas width="14%" right="0" top="0" linksWidth="4" id="particlesGetStarted" />
    </section>
  );
};

export default ReadyGetStarted;
