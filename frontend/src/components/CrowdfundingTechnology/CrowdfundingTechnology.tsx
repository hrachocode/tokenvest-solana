import { TvButton } from "../TvButton/TvButton";
import arrowDown from "../../../public/images/arrowDown.svg";
import Image from "next/image";

const CrowdfundingTechnology = () => {
  return (
    <section className="flex flex-col bg-[url('/images/cell.svg')] justify-center">
      <div className="flex justify-center mt-[150px]">
        <h1 className="max-w-[1200px] text-center leading-normal font-[700] font-fontSecondary ">
                    Revolutionizing <span className="text-textPrimary">Crowdfunding</span> with Web 3.0 Technology
        </h1>
      </div>
      <div className="flex justify-center pt-[32px]">
        <p className="max-w-[800px] text-center text-textSecondary font-fontSecondary text-[26px] leading-normal font-[300]">
                    Empowering Donators, Connecting Backers, and Redefining Crowdfunding Worldwide
        </p>
      </div>
      <div className="flex justify-center pt-[32px]">
        <TvButton>Explore Projects</TvButton>
      </div>
      <div className="flex justify-center pt-[160px] pb-[110px] cursor-pointer">
        <Image alt="arrowDown" src={arrowDown} />
      </div>
      <div className="absolute top-0">
        <div
          className="w-[561px] h-[561px] rounded-[50%] opacity-[0.41] bg-blend-screen mix-blend-screen bg-gradientPrimary">
        </div>
      </div>
    </section>
  );
};

export default CrowdfundingTechnology;
