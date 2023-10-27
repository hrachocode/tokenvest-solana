import { TvButton } from "@/components/TvButton/TvButton";
import { PRODUCTS } from "@/constants/routes";
import TvProductImage from "@/components/TvProductImage/TvProductImage";
import { CMS_API, CMS_PRODUCTS, POPULATE_ALL } from "@/constants/cms";
import { COMPLETE, DRAFT, INVEST } from "@/constants/general";
import { ICMSProduct, IProduct } from "@/interfaces/cmsinterace";
import { handleRequest, METHODS } from "@/utils/handleRequest";
import { receiveDate } from "@/utils/productUtils";
import { GetStaticPropsContext } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import daysIcon from "../../../public/images/days.svg";
import leftAngle from "../../../public/images/leftAngle.svg";
import { useState } from "react";
import Link from "next/link";
import { getDaysLeft } from "@/utils/getDaysLeft";
import { getProgress } from "@/utils/getProgress";

const TvInvestBox = dynamic(() => import("../../components/TvInvestBox/TvInvestBox"), {
  ssr: false
});
const TvInitializeButton = dynamic(() => import("../../components/TvInitializeButton/TvInitializeButton"), {
  ssr: false
});
const TvFinishStartupButton = dynamic(() => import("../../components/TvFinishStartupButton/TvFinishStartupButton"), {
  ssr: false
});
const TvRefundStartupButton = dynamic(() => import("../../components/TvRefundStartupButton/TvRefundStartupButton"), {
  ssr: false
});

export async function getStaticPaths() {

  const { data: product = [] } = await handleRequest(`${process.env.NEXT_PUBLIC_CMS_URL}${CMS_API}${CMS_PRODUCTS}`, METHODS.GET) ?? {};

  const paths = product.map(({ id }: ICMSProduct) => {
    return {
      params: {
        id: id.toString()
      }
    };
  });

  return { paths, fallback: true };
}

export async function getStaticProps({ params: { id } = {} }: GetStaticPropsContext) {
  const { data, data: { attributes } } = await handleRequest(`${process.env.NEXT_PUBLIC_CMS_URL}${CMS_API}${CMS_PRODUCTS}/${id}${POPULATE_ALL}`, METHODS.GET);

  const product: IProduct = {
    id: data.id,
    title: attributes.title,
    raiseGoal: attributes.raiseGoal,
    address: attributes.address,
    ownerAddress: attributes.ownerAddress,
    ownerName: attributes.ownerName,
    raisedAmount: attributes.raisedAmount,
    image: attributes.image?.data?.attributes?.url || null,
    createdAt: attributes.createdAt,
    description: attributes.description,
    days: attributes.days,
    isComplete: attributes.isComplete,
    isExpired: attributes.isExpired,
    isDraft: attributes.isDraft,
    isReady: attributes.isReady,
    category: attributes.category.data.attributes.title
  };

  return {
    props: {
      product
    }
  };
};

export default function Product({
  product: {
    id,
    createdAt,
    image,
    title,
    raiseGoal,
    raisedAmount,
    address,
    ownerAddress,
    days,
    isComplete,
    isDraft,
    category,
    description,
    isReady
  } }: { product: IProduct }) {
  const [ isPopupOpen, setPopupOpen ] = useState(false);
  const [ isDraftButton, setIsDraftButton ] = useState(isDraft);
  const [ resRaisedAmount, setResRaisedAmount ] = useState<number>(raisedAmount);
  const dateText = receiveDate(createdAt);
  const daysLeft = getDaysLeft(createdAt, days);
  const raisedAmountProgres = getProgress(resRaisedAmount, raiseGoal);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const renderButton = () => {
    if (isDraftButton) {
      if (isReady) {
        return <TvInitializeButton
          raiseGoal={raiseGoal}
          days={days}
          productId={id}
          setIsDraftButton={setIsDraftButton}
        />;
      } else {
        return <div className="flex">
          <TvButton disabled>{DRAFT}</TvButton>
        </div>;
      }
    }
    if (isComplete) {
      return <TvButton disabled>{COMPLETE}</TvButton>;
    }
    return <div className="primaryFlex gap-3 mt-[12px]">
      <TvButton onClick={openPopup}>{INVEST}</TvButton>
      <TvFinishStartupButton productId={id} />
      <TvRefundStartupButton productId={id} />
    </div>;
  };

  return (
    <div>
      {isPopupOpen &&
        <div onMouseDown={closePopup} className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-[50]">
          <TvInvestBox
            contractAddress={address}
            productId={id}
            ownerAddress={ownerAddress}
            raiseGoal={raiseGoal}
            resRaisedAmount={resRaisedAmount}
            setResRaisedAmount={setResRaisedAmount}
            closePopup={closePopup}
          />
        </div>
      }
      <TvProductImage image={image} title={title} wide={true} />
      <div className="primaryFlex">
        <div className="p-[6px_12px] mt-[64px] rounded-[20px] border-[2px] border-[#28DBD1]">
          <p className="text-[16px] font-[400] text-center">{category}</p>
        </div>
      </div>
      <div className="primaryFlex flex-col lg:flex-row px-[30px] sm:px-[60px] xl:px-[120px] mt-[64px] gap-[32px]">
        <div className="lg:w-[50%] text-center sm:text-start">
          <p className="text-[32px] lg:text-[48px] font-[500]">About Project</p>
          <p className="text-[16px] lg:text-[20px] font-[400] text-textSecondary font-fontSecondary">
            {description}
          </p>
        </div>
        <div className="lg:w-[50%] bg-backgroundTertiary p-[24px] xl:p-[32px] rounded-[24px]">
          <div className="primaryFlex flex-col sm:flex-row gap-[16px] xl:gap-[28px]">
            <div className="flex w-full bg-[#26545B] rounded-[16px]">
              <Image alt="days" src={daysIcon} className="mx-[15px] xl:mx-[20px]" />
              <div className="py-[16px]">
                <p className="text-[20px] font-[600]">Create Date</p>
                <p className="text-[16px] font-[600] text-textPrimary">{dateText}</p>
              </div>
            </div>
            <div className="flex w-full bg-[#26545B] rounded-[16px]">
              <Image alt="days" src={daysIcon} className="mx-[15px] xl:mx-[20px]" />
              <div className="py-[16px]">
                <p className="text-[20px] font-[600]">Days Left</p>
                <p className="text-[16px] font-[600] text-textPrimary">{daysLeft}</p>
              </div>
            </div>
          </div>
          <div className="mt-[32px] font-[600] ">
            <p className="text-[24px] ">Raised Amount</p>
            <p className="text-[20px] pb-[8px]">{`${resRaisedAmount} SOL`}</p>
            <div className="w-full bg-[#030B15] bg-opacity-[60%] rounded-full h-3">
              <div style={{ width: `${raisedAmountProgres}%` }} className={"bg-backgroundSecondary h-3 rounded-full"}></div>
            </div>
            <p className="text-end text-[20px] pt-[5px] text-textPrimary">{`GOAL: ${raiseGoal} SOL`}</p>
          </div>
          {renderButton()}
        </div>
      </div>
      <div className="flex p-[64px_30px_0_30px] sm:p-[64px_60px_0_60px] xl:p-[64px_120px_0_120px]">
        <Link href={PRODUCTS} >
          <TvButton
            customVariant="secondaryButton"
            animationCustomVariant="animationSecondaryButton"
            icon={leftAngle}>
            All Projects
          </TvButton>
        </Link>
      </div>
    </div>
  );
}
