import { CMS_URL } from "@/constants/cms";
import Image from "next/image";

const TvProductImage = ({ image, title, wide }: { image: string | null, title: string, wide?: boolean }) => {
  return (
    <div className="w-full relative bg-backgroundTertiary rounded-[10px]" style={{ width: `${wide ? "" : "maxWidth:537px"}` }}>
      <div className="relative">
        <div className="z-10">
          {
            image ? <Image
              alt="product"
              src={`${CMS_URL}${image}`}
              width={0}
              height={0}
              sizes="100vw"
              style={{ height: `${wide ? "450px" : "304px"}`, borderRadius: `${wide ? "0" : "10px 10px 0 0"}` }}
              className="w-full object-cover"
            /> : <div className=" min-w-[455px] h-[304px]" />
          }
        </div>
        <div className="flex w-full absolute bottom-[-31px] justify-center items-center z-[20]">
          <div className="w-[10%] border-b-[2px] border-[#28DBD1]" />
          <div className="p-[16px_25px_16px_25px] w-[80%] bg-backgroundTertiary rounded-[30px] border-b-[2px] border-[#28DBD1] text-[20px] font-[500] ">
            {title}
          </div>
          <div className="w-[10%] border-b-[2px] border-[#28DBD1]" />
        </div>
      </div>
    </div>
  );
};

export default TvProductImage;
