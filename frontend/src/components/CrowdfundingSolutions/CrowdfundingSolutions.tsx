import Image from "next/image";
import { SolutionsData } from "@/constants/general";
import vector from "../../../public/images/vector1.svg";
import TvPageCard from "../TvHomePageCard/TvHomePageCard";

const CrowdfundingSolutions = () => {
  return (
    <section className='flex w-full flex-col relative justify-center items-center text-center pt-[90px] mb-[145px]'>
      <div>
        <p className='text-[48px] font-[500]'>Tokenvest: Pioneering Web 3.0 Crowdfunding Solutions</p>
        <p className='text-[18px] text-textSecondary font-fontSecondary font-[400] pt-[20px]'>
          Discover how Tokenvest addresses these challenges and reimagines crowdfunding for the future.
        </p>
      </div>
      <div className='flex w-full justify-center px-[80px] gap-[10px] z-10'>
        <TvPageCard cardData={SolutionsData} />
      </div>
      <div className='absolute right-0' >
        <Image alt='vector' src={vector} />
      </div>
    </section >
  );
};

export default CrowdfundingSolutions;
