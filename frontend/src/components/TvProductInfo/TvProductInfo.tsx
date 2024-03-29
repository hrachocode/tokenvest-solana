import { IProduct } from "@/interfaces/cmsinterace";
import Image from "next/image";
import { TvButton } from "../TvButton/TvButton";
import daysIcon from "../../../public/images/days.svg";
import { getProgress } from "@/utils/getProgress";
import { getDaysLeft } from "@/utils/getDaysLeft";

interface ITvProduct {
  product: IProduct;
  wide?: boolean;
}

const TvProductInfo = ({
  product: {
    category,
    description,
    raisedAmount,
    raiseGoal,
    createdAt,
    days
  },
}: ITvProduct): JSX.Element => {
  const raisedAmountProgres = getProgress(raisedAmount, raiseGoal);
  const daysLeft = getDaysLeft(createdAt, days);
  return (
    <div className="p-[60px_15px_0_15px] md:p-[60px_24px_0_24px]">
      <div className="inline-block p-[6px_12px] rounded-[20px] border-[2px] border-[#28DBD1]">
        <p className="text-[16px] font-[400] text-center">{category}</p>
      </div>
      <div className="py-[32px]">
        <p className="text-[16px] w-60 md:w-80 truncate text-textSecondary font-fontSecondary">{description}</p>
      </div>
      <div>
        <p className="text-[18px] font-[400] pb-[12px]">Raised Ammount</p>
        <div className="text-[16px] font-[600] mb-[8px]">
          <span className="text-textPrimary">{raisedAmount}</span>
          <span>{` / ${raiseGoal} SOL`}</span>
        </div>
        <div className="w-full bg-[#030B15] bg-opacity-[60%] rounded-full h-3">
          <div style={{ width: `${raisedAmountProgres}%` }} className={"bg-backgroundSecondary h-3 rounded-full"}></div>
        </div>
        <div className="h-[1px] my-[32px] bg-backgroundSecondary bg-opacity-[20%]" />
      </div>
      <div className="flex justify-between items-center pb-[24px]">
        <div className="secondaryFlex">
          <Image alt="days" src={daysIcon} />
          <p className="px-[8px]">{`${daysLeft} Days Left`}</p>
        </div>
        <div>
          <TvButton animationBorderColor="#09202F">VIew Details</TvButton>
        </div>
      </div>
    </div>
  );
};

export default TvProductInfo;
