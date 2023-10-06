import { TvButton } from "../TvButton/TvButton";
import vector from "../../../public/images/vector.svg";
import Image from "next/image";
import Link from "next/link";
import { CREATE_PRODUCT } from "@/constants/routes";

const FeeStructure = () => {
  return (
    <section className="flex px-[100px] bg-[#26545B] py-[64px] gap-[64px]">
      <div className="flex items-end w-full">
        <Image alt="vector" src={vector} />
      </div>
      <div className="w-full">
        <p className="text-[24px] font-fontSecondary font-[500]">Our success is tied to yours.</p>
        <p className="text-[48px] font-[500] pb-[20px]">Fair and Transparent Fee Structure</p>
        <p className="pb-[32px] text-[22px] font-[400] text-justify text-textSecondary">
          Tokenvest charges a nominal 3% fee, applicable only after a campaign reaches its funding
          goal and successfully executes.We&apos;re committed to your success and only succeed when you do.
        </p>
        <Link href={CREATE_PRODUCT}>
          <TvButton>Add Project</TvButton>
        </Link>
      </div>
    </section>
  );
};

export default FeeStructure;
