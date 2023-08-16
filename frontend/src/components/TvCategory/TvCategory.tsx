import { CMS_URL } from "@/constants/cms";
import { ICategory } from "@/interfaces/cmsinterace";
import { Box, Typography } from "@mui/material";
import { styles } from "./TvCategory.styles";

interface ITvCategory {
    category: ICategory;
}

export const TvCategory = ({ category: { title, image } }: ITvCategory): JSX.Element => {
  const capitalizedTitle = title[0].toUpperCase() + title.substring(1);
  return (
    <Box sx={styles.categoryBox}>
      <Box sx={{
        ...styles.categoryImage,
        backgroundImage: `url(${CMS_URL}${image})`,
      }}></Box>
      <Box sx={styles.categoryTitle}>
        <Typography variant="h5">{capitalizedTitle}</Typography>
      </Box>
    </Box >
  );
};
