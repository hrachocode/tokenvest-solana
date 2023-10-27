import { TvButton } from "../TvButton/TvButton";
import arrowDown from "../../../public/images/arrowDown.svg";
import Image from "next/image";
import Link from "next/link";

const CrowdfundingTechnology = () => {
  return (
    <section id="x" className="primaryFlex flex-col bg-[url('/images/cell.svg')] px-[60px]">
      <div className="primaryFlex mt-[80px] lg:mt-[150px]">
        <h1 className="text-center leading-normal font-fontSecondary font-[700]">
          Revolutionizing <span className="text-textPrimary">Crowdfunding</span> with Web 3.0 Technology
        </h1>
      </div>
      <div className="primaryFlex pt-[32px]">
        <p className="w-full md:w-[60%] text-center text-textSecondary font-fontSecondary leading-normal font-[300] text-[20px] lg:text-[26px]">
          Empowering Donators, Connecting Backers, and Redefining Crowdfunding Worldwide
        </p>
      </div>
      <div className="primaryFlex pt-[32px]">
        <TvButton>Explore Projects</TvButton>
      </div>
      <div className="primaryFlex p-[70px_0_50px_0] lg:p-[160px_0_110px_0] cursor-pointer">
        <Link href={"#section-to"}>
          <Image alt="arrowDown" src={arrowDown} />
        </Link>
      </div>
      <div className="absolute top-[60px] lg:top-0">
        <div
          className="w-[300px] h-[300px] lg:w-[561px] lg:h-[561px] rounded-[50%] opacity-[0.41] bg-blend-screen mix-blend-screen bg-gradientPrimary">
        </div>
      </div>
    </section >
  );
};

export default CrowdfundingTechnology;
