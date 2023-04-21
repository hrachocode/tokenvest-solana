import { TvButton } from "@/components/TvButton/TvButton";
import { CMS_API, CMS_PRODUCTS, CMS_URL, POPULATE_ALL } from "@/constants/cms";
import { CREATED_BY, INVEST, RAISED, RAISE_GOAL } from "@/constants/general";
import { ICMSProduct, IProduct } from "@/interfaces/cmsinterace";
import { unitProductStyles } from "@/styles/UnitProduct.styles";
import { handleRequest, METHODS } from "@/utils/handleRequest";
import { receiveDate } from "@/utils/productUtils";
import { Box, Typography } from "@mui/material";
import { GetStaticPropsContext } from "next";

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

export async function getStaticProps(context: GetStaticPropsContext) {
  const data = await handleRequest(`${CMS_API}${CMS_PRODUCTS}/${context.params?.id}${POPULATE_ALL}`, METHODS.GET);

  const product: IProduct = {
    id: data.data.id,
    title: data.data.attributes.title,
    raiseGoal: data.data.attributes.raiseGoal,
    sharePercentage: data.data.attributes.sharePercentage,
    address: data.data.attributes.address,
    ownerAddress: data.data.attributes.ownerAddress,
    ownerName: data.data.attributes.ownerName,
    raisedAmount: data.data.attributes.raisedAmount,
    image: data.data.attributes.image?.data?.attributes?.url || null,
    createdAt: data.data.attributes.createdAt,
  };

  return {
    props: {
      product
    }
  };
};

export default function Product({ product }: { product: IProduct }) {
  const dateText = receiveDate(product.createdAt);

  return (
    <Box sx={unitProductStyles.wrapper}>
      {product.image &&
        <Box>
          <Box sx={{
            ...unitProductStyles.productImage,
            backgroundImage: `url(${CMS_URL}${product.image})`,
          }}></Box>
        </Box>}
      <Box sx={unitProductStyles.infoWrapper}>
        <Box sx={unitProductStyles.detailsWrapper}>
          <Box>
            <Typography variant="h2">{product.title}</Typography>
            <Typography color="caption">{dateText}</Typography>
          </Box>
          <Box>
            <Typography variant="h5" color="caption">{CREATED_BY}</Typography>
            <Box sx={unitProductStyles.userInfo}>
              <Box sx={unitProductStyles.userAvatar}></Box>
              <Typography variant="h5">{product.ownerName}</Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={unitProductStyles.investmentBox}>
          <Box sx={unitProductStyles.raiseInfoWrapper}>
            <Box sx={unitProductStyles.raiseInfo}>
              <Typography color="caption" variant="caption">{RAISE_GOAL}</Typography>
              <Typography>{product.raiseGoal}</Typography>
            </Box>
            <Box sx={unitProductStyles.raiseInfo}>
              <Typography color="caption" variant="caption">{RAISED}</Typography>
              <Typography>{product.raisedAmount}</Typography>
            </Box>
          </Box>
          <TvButton customVariant="secondary">{INVEST}</TvButton>
        </Box>
      </Box>

    </Box>
  );
}
