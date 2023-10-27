import { TvButton } from "../TvButton/TvButton";
import vector from "../../../public/images/vector.svg";
import Image from "next/image";
import Link from "next/link";
import { CREATE_PRODUCT } from "@/constants/routes";
import { useScroll } from "@/hooks/useScroll";

const FeeStructure = () => {
  const { isVisible, animationRef } = useScroll();
  return (
    <section ref={animationRef} className="flex bg-[#26545B] p-[64px_60px] lg:px-[100px] gap-[64px]">
      {
        isVisible &&
        <div className={`w-full relative animationLeftToRight hidden lg:flex items-center xl:items-end ${isVisible ? "animationLeftToRight" : ""}`}>
          <Image alt="vector" src={vector} />
        </div>
      }
      {
        isVisible &&
        <div className="w-full relative animationRightToLeft">
          <p className="text-[20px] lg:text-[24px] font-fontSecondary font-[500]">Our success is tied to yours.</p>
          <p className="text-[32px] lg:text-[48px] font-[500] pb-[20px]">Fair and Transparent Fee Structure</p>
          <p className="text-textSecondary pb-[32px] text-[18px] lg:text-[22px] lg:text-justify ">
            Tokenvest charges a nominal 3% fee, applicable only after a campaign reaches its funding
            goal and successfully executes.We&apos;re committed to your success and only succeed when you do.
          </p>
          <div className="flex">
            <Link href={CREATE_PRODUCT}>
              <TvButton>Add Project</TvButton>
            </Link>
          </div>
        </div>
      }
    </section>
  );
};

export default FeeStructure;
