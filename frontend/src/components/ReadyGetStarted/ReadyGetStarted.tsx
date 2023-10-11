import { TvButton } from "../TvButton/TvButton";
import vector from "../../../public/images/vector4.png";
import Image from "next/image";
import Link from "next/link";
import { CREATE_PRODUCT } from "@/constants/routes";

const ReadyGetStarted = ({ title }: { title?: string }) => {
  return (
    <section className="flex flex-col justify-center items-center mx-[80px] bg-[#79FDFF] bg-opacity-[0.3] rounded-[20px] mt-[200px]">
      <div className="max-w-[655px] w-full pt-[100px] text-center">
        <p className="text-[48px] font-[500] pt-[20px]">{title}</p>
        <p className="text-[22px] text-textSecondary font-fontSecondary font-[400]">
          Join Tokenvest and be part of a new era in crowdfunding.
          Explore campaigns, back projects, or launch your own today.
        </p>
      </div>
      <div className="flex pt-[32px] pb-[100px] gap-[32px]">
        <Link href={CREATE_PRODUCT}>
          <TvButton>Add Projects</TvButton>
        </Link>
        <TvButton customVariant="secondaryButton">Explore Projects</TvButton>
      </div>
      <div className='absolute right-0' >
        <Image alt='vector' src={vector} />
      </div>
    </section>
  );
};

export default ReadyGetStarted;
