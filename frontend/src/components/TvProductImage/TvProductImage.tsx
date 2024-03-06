import Image from "next/image";
import vector from "../../../public/images/vector6.svg";
import vector1 from "../../../public/images/vector7.svg";
import vector2 from "../../../public/images/vector8.svg";
import vector3 from "../../../public/images/vector9.svg";
import emtyImage from "../../../public/images/empty.png";

const TvProductImage = ({ image, title, wide }: { image: string | null, title: string, wide?: boolean }) => {
  console.log(`${process.env.NEXT_PUBLIC_CMS_URL}${image}`, 'image');
  return (
    <div className="w-full relative"
    >
      <div className={`${wide ? "w-[100%] h-[450px]" : "w-[470] h-[300px] rounded-[10px_10px_0_0]"}`}>
        <Image
          alt="product"
          src={image ? `${process.env.NEXT_PUBLIC_CMS_URL}${image}` : emtyImage}
          layout="fill"
          className={`object-cover rounded-${wide ? "unset" : "[10px_10px_0_0]"}`}
        />
      </div>
      <Image alt="vector" src={wide ? vector2 : vector3} className={`rotate-[180deg] absolute left-0 ${wide ? "min-h-[21px] bottom-[-5px] sm:bottom-[-3px]" : "bottom-[-3px]"}`} />
      <div className="flex w-full justify-center xl:justify-start absolute z-40">
        <Image alt="vector" src={wide ? vector1 : vector} className={`${wide ? "min-h-[15px]" : ""}`} />
        <p className={`absolute text-[16px] sm:text-[20px] z-20 ${wide ? "bottom-[calc(100%_-_13px)] sm:bottom-[calc(100%_-_16px)] clear-left xl:left-[18%]" : "bottom-[calc(100%_-_16px)] sm:bottom-[calc(100%_-_18px)] clear-left sm:left-[60px]"}`}>
          {title}
        </p>
      </div>
    </div>
  );
};

export default TvProductImage;
