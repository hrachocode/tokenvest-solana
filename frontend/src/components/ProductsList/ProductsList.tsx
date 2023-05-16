import { MAX_PRODUCTS_HOME, PRODUCTS_BROWSER_TITLE, SEE_ALL } from "@/constants/general";
import { IProduct } from "@/interfaces/cmsinterace";
import { PRODUCTS } from "@/constants/routes";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { TvButton } from "../TvButton/TvButton";
import { TvProduct } from "../TvProduct/TvProduct";
import { styles } from "./productsList.styles";

interface IProductsList {
  products: IProduct[];
}

export const ProductsList = ({ products }: IProductsList): JSX.Element => {
  if (products.length) {
    return (
      <Box sx={styles.browserWrapper}>
        <Box sx={styles.titleWrapper}>
          <Typography variant="h3">{PRODUCTS_BROWSER_TITLE}</Typography>
          <Link href={PRODUCTS}>
            <TvButton customVariant="secondary">{SEE_ALL}</TvButton>
          </Link>
        </Box>
        <Box sx={products.length === MAX_PRODUCTS_HOME
          ? styles.productsWrapper
          : styles.productsWrapperSecondary
        }>
          {products.map((item: IProduct) =>
            <Link href={`${PRODUCTS}/${item.id}`} key={item.id}>
              <TvProduct product={item} />
            </Link>
          )}
        </Box>
      </Box>
    );
  } else {
    return <></>;
  }

};
