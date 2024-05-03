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
import { useEffect, useState } from "react";
import Link from "next/link";
import { getDaysLeft } from "@/utils/getDaysLeft";
import { getProgress } from "@/utils/getProgress";
import { marked } from "marked";
import TvUserPopUp from "@/components/TvUserPopUp/TvUserPopUp";

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
    category: attributes.category.data.attributes.title,
    content: attributes.content,
    video: attributes.video.data?.attributes?.url || null,
    productUser: attributes.product_user
  };

  return {
    props: {
      product
    },
    revalidate: 3600,
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
    isReady,
    content,
    video,
    productUser
  } }: { product: IProduct }) {
  const [ isPopupOpen, setPopupOpen ] = useState(false);
  const [ IsUserPopUp, setIsUserPopUp ] = useState(false);
  const [ isDraftButton, setIsDraftButton ] = useState(isDraft);
  const [ resRaisedAmount, setResRaisedAmount ] = useState<number>(raisedAmount);
  const dateText = receiveDate(createdAt);
  const daysLeft = getDaysLeft(createdAt, days);
  const raisedAmountProgres = getProgress(resRaisedAmount, raiseGoal);
  const [ htmlContent, setContent ] = useState("");

  useEffect(() => {
    (async () => {
      function convertMarkdownToHTML(content: string) {
        return marked(content);
      }
      if (content) {

        const htmlContent: any = convertMarkdownToHTML(content);
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, "text/html");

        // Manipulate the src attributes of images
        const images = doc.querySelectorAll("img");

        images.forEach(img => {
          const currentSrc = img.getAttribute("src");

          // Here, you can perform any logic to update the src attribute dynamically
          // For example, you can replace 'incorrect_path' with 'correct_path'
          const updatedSrc = `${process.env.NEXT_PUBLIC_CMS_URL}${currentSrc}`;
          img.setAttribute("src", updatedSrc);
        });
        const correctedHTML = doc.documentElement.outerHTML;
        setContent(correctedHTML);
      }
    })();
  }, []);

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
        return <div className="flex justify-end">
          <TvButton animationBorderColor="#09202F" disabled>{DRAFT}</TvButton>
        </div>;
      }
    }
    if (isComplete) {
      return <TvButton disabled>{COMPLETE}</TvButton>;
    }
    return <div className="primaryFlex gap-3 mt-[12px]">
      <TvButton animationBorderColor="#09202F" onClick={openPopup}>{INVEST}</TvButton>
      <TvFinishStartupButton productId={id} />
      <TvRefundStartupButton productId={id} />
    </div>;
  };

  return (
    <div>
      {
        IsUserPopUp &&
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-[60]">
          <TvUserPopUp setIsUserPopUp={setIsUserPopUp} productUser={productUser} />
        </div>
      }
      {isPopupOpen &&
        <div onMouseDown={closePopup} className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-[60]">
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
      <div onClick={() => setIsUserPopUp(!IsUserPopUp)} className="primaryFlex">
        <div className="p-[8px_12px] mt-[94px] rounded-[20px] border-[2px] border-[#28DBD1]">
          <button>USER INFO</button>
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
      {
        video &&
        <div className="px-[30px] sm:px-[60px] xl:px-[120px] mt-[64px]">
          <h1 className="text-center">The Video of the project</h1>
          <div>
            <div className="max-w-[900px] mx-auto w-full h-[450px] overflow-hidden">
              <video controls className="w-full h-full object-cover rounded-lg">
                <source src={`${process.env.NEXT_PUBLIC_CMS_URL}${video}`} />
              </video>
            </div>
          </div>
        </div>
      }
      <div className="primaryFlex flex-col lg:flex-row px-[30px] sm:px-[60px] xl:px-[120px] mt-[64px] gap-[32px] myHtmlContent">
        {htmlContent ? <div dangerouslySetInnerHTML={{ __html: htmlContent }} /> : null}
      </div>
      <div className="flex p-[64px_30px_0_30px] sm:p-[64px_60px_0_60px] xl:p-[64px_120px_0_120px]">
        <Link href={PRODUCTS} >
          <TvButton
            customVariant="secondaryButton"
            animationCustomVariant="animationSecondaryButton"
            animationBorderColor="#09202F"
            icon={leftAngle}>
            All Projects
          </TvButton>
        </Link>
      </div>
    </div>
  );
}
