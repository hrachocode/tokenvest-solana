import { COPYRIGHT_TEXT, FOOTER_EXPLORE, FOOTER_MARKETPLACE } from "@/constants/footer";
import { EMAIL_PLACEHOLDER, JOIN_US_TEXT_MAIN, JOIN_US_TEXT_SECONDARY, SUBSCRIBE } from "@/constants/general";
import { Box, Typography } from "@mui/material";
import { TvButton } from "../TvButton/TvButton";
import { TvInput } from "../TvInput/TvInput";
import { styles } from "./footer.styles";

export const Footer = (): JSX.Element => {
  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.contentWrapper}>
        <Box sx={styles.content}>
          <Typography variant="h5">{FOOTER_MARKETPLACE.TITLE}</Typography>
          <Typography variant="caption" color="caption">{FOOTER_MARKETPLACE.TEXT1}</Typography>
          <Typography variant="caption" color="caption">{FOOTER_MARKETPLACE.TEXT2}</Typography>
        </Box>
        <Box sx={styles.content}>
          <Typography variant="h5">{FOOTER_EXPLORE.TITLE}</Typography>
          <Typography variant="caption" color="caption">{FOOTER_EXPLORE.MARKETPLACE}</Typography>
          <Typography variant="caption" color="caption">{FOOTER_EXPLORE.RANKINGS}</Typography>
          <Typography variant="caption" color="caption">{FOOTER_EXPLORE.WALLET}</Typography>
        </Box>
        <Box sx={styles.content}>
          <Typography variant="h5">{JOIN_US_TEXT_MAIN}</Typography>
          <Typography variant="caption" color="caption"> {JOIN_US_TEXT_SECONDARY}</Typography>
          <Box sx={styles.inputWrapper} >
            <TvInput placeholder={EMAIL_PLACEHOLDER} customVariant="secondary" />
            <Box sx={styles.buttonWrapper}>
              <TvButton fullWidth={true} customVariant="secondary">{SUBSCRIBE}</TvButton>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={styles.line}></Box>
      <Typography
        sx={styles.copyrightText}
        variant="caption"
        color="caption">
        {COPYRIGHT_TEXT}</Typography>
    </Box>
  );
};
