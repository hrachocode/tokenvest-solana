import { CMS_URL } from "@/constants/cms";
import { RAISED, RAISE_GOAL } from "@/constants/general";
import { IProduct } from "@/interfaces/cmsinterace";
import { Box, Typography } from "@mui/material";
import { styles } from "./TvProduct.styles";

interface ITvProduct {
    product: IProduct
}

export const TvProduct = ({ product }: ITvProduct): JSX.Element => {
  return (
    <Box sx={styles.productWrapper}>
      <Box sx={{
        ...styles.productImage,
        backgroundImage: `url(${CMS_URL}${product.image})`,
      }}></Box>
      <Box sx={styles.productInfoWrapper}>
        <Typography variant="h5">{product.title}</Typography>
        <Box sx={styles.userInfo}>
          <Box sx={styles.userAvatar}></Box>
          <Typography>{product.ownerName}</Typography>
        </Box>
        <Box sx={styles.raiseInfoWrapper}>
          <Box sx={styles.raiseInfo}>
            <Typography sx={styles.raiseInfoTitle} variant="caption">{RAISE_GOAL}</Typography>
            <Typography>{product.raiseGoal}</Typography>
          </Box>
          <Box sx={styles.raiseInfo}>
            <Typography sx={styles.raiseInfoTitle} variant="caption">{RAISED}</Typography>
            <Typography>{product.raisedAmount}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
