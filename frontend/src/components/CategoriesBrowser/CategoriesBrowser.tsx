import { CATEGORIES_BROWSER_TITLE } from "@/constants/general";
import { ICategory } from "@/interfaces/cmsinterace";
import { Box, Typography } from "@mui/material";
import { Fragment } from "react";
import { TvCategory } from "../TvCategory/TvCategory";
import { styles } from "./CategoriesBrowser.styles";

interface ICategoriesBrowser {
  categories: ICategory[];
}

export const CategoriesBrowser = ({ categories }: ICategoriesBrowser): JSX.Element => {
  return (
    <Box sx={styles.browserWrapper}>
      <Typography variant="h3">{CATEGORIES_BROWSER_TITLE}</Typography>
      <Box sx={styles.categoriesWrapper}>
        {categories.map((item: ICategory, index) =>
          <Fragment key={index + 1}>
            <TvCategory category={item} />
          </Fragment>
        )
        })
      </Box>
    </Box>
  );
};
