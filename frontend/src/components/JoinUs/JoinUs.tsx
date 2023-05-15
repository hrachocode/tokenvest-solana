import { CMS_URL } from "@/constants/cms";
import { EMAIL_PLACEHOLDER, JOIN_US_TEXT_MAIN, JOIN_US_TEXT_SECONDARY, SUBSCRIBE } from "@/constants/general";
import { IProduct } from "@/interfaces/cmsinterace";
import { Box, Typography } from "@mui/material";
import { TvButton } from "../TvButton/TvButton";
import { TvInput } from "../TvInput/TvInput";
import { styles } from "./JoinUs.styles";

interface IJoinUs {
    product: IProduct;
}

export const JoinUs = ({ product }: IJoinUs) => {
  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.content}>
        <Box sx={{
          backgroundImage: `url(${CMS_URL}${product.image})`,
          ...styles.joinUsImage
        }}>
        </Box>
        <Box sx={styles.infoWrapper}>
          <Typography variant="h3">{JOIN_US_TEXT_MAIN}</Typography>
          <Typography>{JOIN_US_TEXT_SECONDARY}</Typography>
          <Box sx={styles.inputWrapper} >
            <TvInput placeholder={EMAIL_PLACEHOLDER} customVariant="secondary" />
            <Box sx={styles.buttonWrapper}>
              <TvButton customVariant="secondary">{SUBSCRIBE}</TvButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
