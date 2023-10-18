import { CMS_URL } from "@/constants/cms";
import Image from "next/image";

const TvProductImage = ({ image, title, wide }: { image: string | null, title: string, wide?: boolean }) => {
  return (
    <div className="w-full relative rounded-[10px_10px_0_0]"
    >
      <div className="relative">
        <div className="z-10">
          {
            image ? <Image
              alt="product"
              src={`${CMS_URL}${image}`}
              width={0}
              height={0}
              style={{ width: wide ? "100%" : 470, minHeight: wide ? "unset" : 304, height: wide ? 450 : 300 }}
              sizes="100vw"
              className={`w-full object-cover rounded-${wide ? "unset" : "[10px_10px_0_0]"}`}
            /> : <div className=" min-w-[455px] h-[304px]" />
          }
        </div>
        <div className="flex w-full absolute bottom-[-31px] justify-center items-center z-[20]">
          <div className="w-[10%] border-b-[2px] border-[#28DBD1]" />
          <div className="w-[80%] p-[16px_25px_16px_25px] bg-backgroundTertiary rounded-[30px] border-b-[2px] border-[#28DBD1]">
            <p className="text-[16px] sm:text-[20px] font-[500]">
              {title}
            </p>
          </div>
          <div className="w-[10%] border-b-[2px] border-[#28DBD1]" />
        </div>
      </div>
    </div>
  );
};

export default TvProductImage;
