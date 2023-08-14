import { FEATURED_PRODUCT_TITLE, GO_TO_PRODUCT } from "@/constants/general";
import { PRODUCTS } from "@/constants/routes";
import { IProduct } from "@/interfaces/cmsinterace";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { TvButton } from "../TvButton/TvButton";
import { TvProduct } from "../TvProduct/TvProduct";
import { styles } from "./TvFeaturedProduct.styles";

interface ITvFeaturedProduct {
    product: IProduct;
}

export const TvFeaturedProduct = ({ product }: ITvFeaturedProduct): JSX.Element => {
  if (product.id) {
    return (
      <Box sx={styles.featuredProductWrapper}>
        <Box sx={styles.featuredProductInfo}>
          <Typography variant="h1" sx={styles.featuredProductText}>{FEATURED_PRODUCT_TITLE}</Typography>
          <Typography sx={styles.featuredProductText} >{product.description}</Typography>
          <Link href={`${PRODUCTS}/${product.id}`}>
            <TvButton customVariant="secondary">{GO_TO_PRODUCT}</TvButton>
          </Link>
        </Box>
        <TvProduct product={product} wide={true} />
      </Box >
    );
  } else {
    return <></>;
  }
};
