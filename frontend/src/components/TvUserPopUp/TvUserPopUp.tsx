import { Dispatch, SetStateAction } from "react";
import { TvButton } from "../TvButton/TvButton";
const TvUserPopUp = (
  { productUser, setIsUserPopUp }: { productUser: any, setIsUserPopUp: Dispatch<SetStateAction<boolean>> }
) => {
  return (
    <div className="max-w-[450px] flex flex-col p-7 mx-5 rounded-[20px] gap-2 bg-[#26545B]">
      <p><span className="text-[#28dbd1]">Name:</span> {productUser.data.attributes.name}</p>
      <p><span className="text-[#28dbd1]">Country:</span> {productUser.data.attributes.country}</p>
      <p><span className="text-[#28dbd1]">City:</span> {productUser.data.attributes.city}</p>
      <p><span className="text-[#28dbd1]">Description:</span> {productUser.data.attributes.description}</p>
      <TvButton onClick={() => setIsUserPopUp(false)}>Close</TvButton>
    </div>
  );
};

export default TvUserPopUp;
