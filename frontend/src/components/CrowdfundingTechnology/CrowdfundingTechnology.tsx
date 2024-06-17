import { TvButton } from "../TvButton/TvButton";
import arrowDown from "../../../public/images/arrowDown.svg";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import SquaresEffect from "../SquaresEffect/SquaresEffect";
import { CMS_PRODUCTS } from "@/constants/cms";

const CrowdfundingTechnology = () => {
  const animationRef = useRef<HTMLDivElement | null>(null);
  return (
    <section ref={animationRef} className="secondaryFlex w-full flex-col relative px-[60px] overflow-hidden">
      <SquaresEffect animationRef={animationRef} />
      <div className="primaryFlex max-w-[1317px] w-full mt-[80px] lg:mt-[150px] pointer-events-none">
        <h1 className="text-center leading-normal font-[700]">
          Revolutionizing <span className="text-textTertiary">Crowdfunding</span> with Web 3.0 Technology
        </h1>
      </div>
      <div className="primaryFlex pt-[32px]">
        <p className="w-full md:w-[60%] text-center text-textSecondary font-fontSecondary leading-normal font-[300] text-[20px] lg:text-[26px]">
          Empowering Donators, Connecting Backers, and Redefining Crowdfunding Worldwide
        </p>
      </div>
      <div className="primaryFlex pt-[32px]">
        <Link href={CMS_PRODUCTS} className="z-30">
          <TvButton animationBorderColor="#09202F">Explore Projects</TvButton>
        </Link>
      </div>
      <Link href={"#section-to"} className="primaryFlex m-[70px_0_50px_0] lg:m-[160px_0_110px_0] cursor-pointer">
        <Image alt="arrowDown" src={arrowDown} className="z-30" />
      </Link>
    </section >
  );
};

export default CrowdfundingTechnology;
