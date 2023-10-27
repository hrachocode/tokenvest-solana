import Image from "next/image";
import solana from "../../../public/images/solana.png";
import { useScroll } from "@/hooks/useScroll";

const InnovatingTechnology = () => {
  const { isVisible, animationRef } = useScroll();
  return (
    <section ref={animationRef} className="secondaryFlex flex-col md:flex-row px-[20px] pt-[80px] md:pt-[120px] gap-[64px]">
      {
        isVisible &&
        <div className={`relative ${isVisible ? "animationLeftToRight" : ""}`}>
          <Image alt="solana" src={solana} />
        </div>
      }
      {
        isVisible &&
        <div className="relative animationRightToLeft max-w-[777px] w-full text-center md:text-start">
          <p className="text-[18px] lg:text-[24px] text-textPrimary font-fontSecondary font-[500]">
            Smart contracts ensure trust and efficiency in every campaign.
          </p>
          <p className="text-[32px] lg:text-[48px] font-[500] pb-[20]">Innovating with Solana Technology</p>
          <p className="text-[16px] lg:text-[22px] font-[400] text-textSecondary">
            Our platform operates with the speed, scalability, and security of the Solana blockchain.
            We&apos;re proud to harness the potential of Web 3.0 through Solana,
            ensuring a seamless experience for all users.
          </p>
        </div>
      }
    </section>
  );
};

export default InnovatingTechnology;
