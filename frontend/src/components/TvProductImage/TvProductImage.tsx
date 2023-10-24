import Image from "next/image";
import vector from "../../../public/images/vector6.svg";
import vector1 from "../../../public/images/vector7.svg";

const TvProductImage = ({ image, title, wide }: { image: string | null, title: string, wide?: boolean }) => {
  return (
    <div className="w-full relative rounded-[10px_10px_0_0]"
    >
      <div className="relative">
        <div className="z-10">
          {
            image ? <Image
              alt="product"
              src={`${process.env.NEXT_PUBLIC_CMS_URL}${image}`}
              width={0}
              height={0}
              style={{ width: wide ? "100%" : 470, minHeight: wide ? "unset" : 304, height: wide ? 450 : 300 }}
              sizes="100vw"
              className={`w-full object-cover rounded-${wide ? "unset" : "[10px_10px_0_0]"}`}
            /> : <div className=" min-w-[455px] h-[304px]" />
          }
        </div>

        <div className="flex w-full justify-center xl:justify-start absolute z-50">
          <Image alt="vector" src={wide ? vector1 : vector} />
          <p className={`absolute text-[18px] sm:text-[20px] z-20 ${wide ? "bottom-[calc(100%_-_8px)] sm:bottom-[calc(100%_-_8px)] md:bottom-[calc(100%_-_12px)] clear-left xl:left-[18%]" : "bottom-[11px] sm:bottom-[15px] clear-left sm:left-[60px]"}`}>
            {title}
          </p>
        </div>
        <div className="secondaryFlex w-full absolute bottom-0 z-10">
          <div className={`relative rounded-[30px_30px_1px_8px] ${wide ? "h-[43px] w-[71%] bg-backgroundPrimary product-border-radius" : "h-[29px] w-[82%] bg-backgroundTertiary products-border-radius"}`} />
        </div>
      </div>
    </div>
  );
};

export default TvProductImage;
