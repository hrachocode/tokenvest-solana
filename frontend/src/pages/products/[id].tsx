import { TvButton } from "@/components/TvButton/TvButton";
import { CMS_API, CMS_PRODUCTS, CMS_URL, POPULATE_ALL } from "@/constants/cms";
import { CREATED_BY, INVEST, RAISED, RAISE_GOAL } from "@/constants/general";
import { ICMSProduct, IProduct } from "@/interfaces/cmsinterace";
import { unitProductStyles } from "@/styles/UnitProduct.styles";
import { handleRequest, METHODS } from "@/utils/handleRequest";
import { receiveDate } from "@/utils/productUtils";
import { Box, Typography } from "@mui/material";
import { GetStaticPropsContext } from "next";
import dynamic from "next/dynamic";
import { useState } from "react";

const TvInvestBox = dynamic(() => import("../../components/TvInvestBox/TvInvestBox"), {
  ssr: false
});

export async function getStaticPaths() {

  const { data: product = [] } = await handleRequest(`${CMS_API}${CMS_PRODUCTS}`, METHODS.GET) ?? {};

  const paths = product.map(({ id }: ICMSProduct) => {
    return {
      params: {
        id: id.toString()
      }
    };
  });

  return { paths, fallback: false };
}

export async function getStaticProps({ params: { id } = {} }: GetStaticPropsContext) {
  const { data, data: { attributes } } = await handleRequest(`${CMS_API}${CMS_PRODUCTS}/${id}${POPULATE_ALL}`, METHODS.GET);

  const product: IProduct = {
    id: data.id,
    title: attributes.title,
    raiseGoal: attributes.raiseGoal,
    sharePercentage: attributes.sharePercentage,
    address: attributes.address,
    ownerAddress: attributes.ownerAddress,
    ownerName: attributes.ownerName,
    raisedAmount: attributes.raisedAmount,
    image: attributes.image?.data?.attributes?.url || null,
    createdAt: attributes.createdAt,
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
    ownerName,
    raiseGoal,
    raisedAmount,
    address
  } }: { product: IProduct }) {
  const [ isPopupOpen, setPopupOpen ] = useState(false);
  const dateText = receiveDate(createdAt);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  return (
    <Box sx={unitProductStyles.wrapper}>
      {isPopupOpen &&
        <Box onMouseDown={closePopup} sx={unitProductStyles.popupWrapper}>
          <TvInvestBox contractAddress={address} productId={id} />
        </Box>
      }
      {image &&
        <Box>
          <Box sx={{
            ...unitProductStyles.productImage,
            backgroundImage: `url(${CMS_URL}${image})`,
          }}></Box>
        </Box>}
      <Box sx={unitProductStyles.infoWrapper}>
        <Box sx={unitProductStyles.detailsWrapper}>
          <Box>
            <Typography variant="h2">{title}</Typography>
            <Typography color="caption">{dateText}</Typography>
          </Box>
          <Box>
            <Typography variant="h5" color="caption">{CREATED_BY}</Typography>
            <Box sx={unitProductStyles.userInfo}>
              <Box sx={unitProductStyles.userAvatar}></Box>
              <Typography variant="h5">{ownerName}</Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={unitProductStyles.investmentBox}>
          <Box sx={unitProductStyles.raiseInfoWrapper}>
            <Box sx={unitProductStyles.raiseInfo}>
              <Typography color="caption" variant="caption">{RAISE_GOAL}</Typography>
              <Typography>{raiseGoal}</Typography>
            </Box>
            <Box sx={unitProductStyles.raiseInfo}>
              <Typography color="caption" variant="caption">{RAISED}</Typography>
              <Typography>{raisedAmount}</Typography>
            </Box>
          </Box>
          <TvButton onClick={openPopup} customVariant="secondary">{INVEST}</TvButton>
        </Box>
      </Box>

    </Box>
  );
}
