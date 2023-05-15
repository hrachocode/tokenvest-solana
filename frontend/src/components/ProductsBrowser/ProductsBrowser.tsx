import { PRODUCTS_BROWSER_TITLE } from "@/constants/general";
import { IProduct } from "@/interfaces/cmsinterace";
import { Box, Typography } from "@mui/material";
import { Fragment } from "react";
import { TvProduct } from "../TvProduct/TvProduct";
import { styles } from "./productsBrowser.styles";

interface IProductsBrowser {
    products: IProduct[];
}

export const ProductsBrowser = ({ products }: IProductsBrowser): JSX.Element => {
    return (
        <Box sx={styles.browserWrapper}>
            <Typography variant="h3">{PRODUCTS_BROWSER_TITLE}</Typography>
            <Box sx={styles.categoriesWrapper}>
                {products.map((item: IProduct, index) =>
                    <Fragment key={index + 1}>
                        <TvProduct product={item} />
                    </Fragment>
                )}
            </Box>
        </Box>
    );
};
