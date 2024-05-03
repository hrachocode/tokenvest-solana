import { Dispatch, SetStateAction } from "react";
import { TvButton } from "../TvButton/TvButton";
import Link from "next/link";
import { LINKS, USER_INFO } from "@/constants/general";

const TvUserPopUp = ({
  productUser: { data: { attributes } }, setIsUserPopUp
}:
  {
    productUser: any, setIsUserPopUp: Dispatch<SetStateAction<boolean>>
  }
) => {

  return (
    <div className="max-w-[450px] flex flex-col p-7 mx-5 rounded-[20px] gap-2 bg-[#26545B]">
      <p><span className="text-[#28dbd1]">{USER_INFO.name}:</span> {attributes.name}</p>
      <p><span className="text-[#28dbd1]">{USER_INFO.country}:</span> {attributes.country}</p>
      <p><span className="text-[#28dbd1]">{USER_INFO.city}:</span> {attributes.city}</p>
      <p><span className="text-[#28dbd1]">{USER_INFO.description}:</span> {attributes.description}</p>
      <div className="flex justify-evenly text-[#28dbd1] my-2">
        <Link href={attributes.linkedin} target="_blank">
          {LINKS.linkedin}
        </Link>
        <Link href={attributes.facebook} target="_blank">
          {LINKS.facebook}
        </Link>
        <Link href={attributes.instagram} target="_blank">
          {LINKS.instagram}
        </Link>
      </div>
      <TvButton onClick={() => setIsUserPopUp(false)}>Close</TvButton>
    </div>
  );
};

export default TvUserPopUp;
