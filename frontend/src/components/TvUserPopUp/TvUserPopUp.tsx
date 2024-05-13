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
      {
        attributes.name && <p><span className="text-[#28dbd1]">{USER_INFO.name}:</span> {attributes.name}</p>
      }
      {
        attributes.country && <p><span className="text-[#28dbd1]">{USER_INFO.country}:</span> {attributes.country}</p>
      }
      {
        attributes.city && <p><span className="text-[#28dbd1]">{USER_INFO.city}:</span> {attributes.city}</p>
      }
      {
        attributes.description && <p><span className="text-[#28dbd1]">{USER_INFO.description}:</span> {attributes.description}</p>
      }
      <div className="flex justify-evenly text-[#28dbd1] my-2">
        {
          attributes.linkedin &&
          <Link href={attributes.linkedin} target="_blank">
            {LINKS.linkedin}
          </Link>
        }
        {
          attributes.facebook &&
          <Link href={attributes.facebook} target="_blank">
            {LINKS.facebook}
          </Link>
        }
      </div>
      <div className="secondaryFlex">
        <TvButton onClick={() => setIsUserPopUp(false)}>Close</TvButton>
      </div>
    </div>
  );
};

export default TvUserPopUp;
