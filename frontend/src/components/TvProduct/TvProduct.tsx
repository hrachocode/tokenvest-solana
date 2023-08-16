import { CMS_URL } from "@/constants/cms";
import { COMPLETE, RAISED, RAISE_GOAL } from "@/constants/general";
import { IProduct } from "@/interfaces/cmsinterace";
import { Box, Typography } from "@mui/material";
import { styles } from "./TvProduct.styles";

interface ITvProduct {
  product: IProduct;
  wide?: boolean;
}

export const TvProduct = ({
  product: {
    image,
    title,
    ownerName,
    raiseGoal,
    raisedAmount,
    isComplete
  },
  wide
}: ITvProduct): JSX.Element => {
  return (
    <Box sx={
      isComplete ? styles.productWrapperComplete :
        wide ? styles.productWrapperWide : styles.productWrapper
    }>
      {isComplete ? <Box sx={styles.productComplete} >
        <Typography>{COMPLETE}</Typography>
      </Box > : <></>}
      <Box sx={{
        ...styles.productImage,
        backgroundImage: `url(${CMS_URL}${image})`,
      }}></Box>
      <Box sx={styles.productInfoWrapper}>
        <Typography variant="h5">{title}</Typography>
        <Box sx={styles.userInfo}>
          <Box sx={styles.userAvatar}></Box>
          <Typography>{ownerName}</Typography>
        </Box>
        <Box sx={styles.raiseInfoWrapper}>
          <Box sx={styles.raiseInfo}>
            <Typography color="caption" variant="caption">{RAISE_GOAL}</Typography>
            <Typography>{raiseGoal}</Typography>
          </Box>
          <Box sx={styles.raiseInfo}>
            <Typography color="caption" variant="caption">{RAISED}</Typography>
            <Typography>{raisedAmount}</Typography>
          </Box>
        </Box>
      </Box>
    </Box >
  );
};
