import Image from "next/image";
import { SolutionsData } from "@/constants/general";
import vector from "../../../public/images/vector1.svg";
import TvPageCard from "../TvHomePageCard/TvHomePageCard";

const CrowdfundingSolutions = () => {
  return (
    <section className='secondaryFlex w-full flex-col relative text-center p-[90px_60px_145px_60px]'>
      <div>
        <p className='text-[26px] md:text-[32px] lg:text-[48px] font-[500]'>Tokenvest: Pioneering Web 3.0 Crowdfunding Solutions</p>
        <p className='text-[18px] text-textSecondary font-fontSecondary font-[400] pt-[20px]'>
          Discover how Tokenvest addresses these challenges and reimagines crowdfunding for the future.
        </p>
      </div>
      <div className='primaryFlex flex-wrap lg:flex-nowrap gap-[10px] z-10'>
        <TvPageCard cardData={SolutionsData} />
      </div>
      <div className='absolute right-0' >
        <Image alt='vector' src={vector} />
      </div>
    </section >
  );
};

export default CrowdfundingSolutions;
