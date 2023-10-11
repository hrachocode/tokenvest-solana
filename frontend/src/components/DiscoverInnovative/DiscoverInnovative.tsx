import Image from "next/image";
import vector from "../../../public/images/vector5.svg";

const DiscoverInnovative = () => {
  return (
    <div className="flex relative flex-col justify-center items-center mt-[200px]">
      <div className="font-[700] text-center">
        <h1>Discover Innovative</h1>
        <h1 className="text-textPrimary">Projects</h1>
      </div>
      <div className="max-w-[916px] w-full text-center mt-[32px]">
        <p className="font-fontSecondary text-textSecondary text-[26px] font-[300]">
                    Browse through a diverse range of campaigns that represent
                    groundbreaking ideas and projects from innovators worldwide.
                    Your support can turn these visions into reality.
        </p>
      </div>
      <div className='absolute left-0 bottom-[-100px]' >
        <Image alt='vector' src={vector} />
      </div>
      <div
        className="absolute right-0 top-[200px] w-[561px] h-[561px] rounded-[50%] opacity-[0.41] bg-blend-screen mix-blend-screen bg-gradientPrimary">
      </div>
    </div>
  );
};

export default DiscoverInnovative;
