import Image from "next/image";
import solana from "../../../public/images/solana.png";

const InnovatingTechnology = () => {
  return (
    <section className="flex justify-center items-center pt-[200px] gap-[64px]">
      <div>
        <Image alt="solana" src={solana} />
      </div>
      <div className="max-w-[777px] w-full">
        <p className="text-[24px] text-textPrimary font-fontSecondary font-[500]">
          Smart contracts ensure trust and efficiency in every campaign.
        </p>
        <p className="text-[48px] font-[500] pb-[20]">Innovating with Solana Technology</p>
        <p className="text-[22px] font-[400] text-textSecondary">
          Our platform operates with the speed, scalability, and security of the Solana blockchain.
          We&apos;re proud to harness the potential of Web 3.0 through Solana,
          ensuring a seamless experience for all users.
        </p>
      </div>
    </section>
  );
};

export default InnovatingTechnology;
