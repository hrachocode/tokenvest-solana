import { TvButton } from "../TvButton/TvButton";
import vector from "../../../public/images/vector4.png";
import Image from "next/image";
import Link from "next/link";
import { CREATE_PRODUCT } from "@/constants/routes";
import { useScroll } from "@/hooks/useScroll";
interface IReadyGetStartedProps {
  title: string,
  background?: string,
}

const ReadyGetStarted = (props: IReadyGetStartedProps): JSX.Element => {
  const { title, background = "readyGetStartedPrimary" } = props;
  const { isVisible, animationRef } = useScroll();
  return (
    <section ref={animationRef} className={`secondaryFlex flex-col px-[20px] m-[40px] sm:m-[80px] md:mt-[200px] rounded-[20px] ${background}`}>
      {
        isVisible &&
        <div className="z-20">
          <div className="relative max-w-[655px] w-full text-center pt-[64px] lg:pt-[100px] animationDropDown">
            <p className="text-[32px] lg:text-[48px] font-[500] pt-[20px]">{title}</p>
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
              <TvButton customVariant="secondaryButton" animationCustomVariant="animationSecondaryButton">Explore Projects</TvButton>
            </div>
          </div>
        </div>
      }
      <div className='absolute right-0' >
        <Image alt='vector' src={vector} />
      </div>
    </section>
  );
};

export default ReadyGetStarted;
