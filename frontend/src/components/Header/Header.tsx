import { ROUTES } from "@/constants/routes";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { TvButton } from "../TvButton/TvButton";
import { styles } from "./Header.styles";

export const Header = (): JSX.Element => {
    return (
        <Box sx={styles.header}>
            <Box>
                <Link href="/">
                    <Typography variant="h5" sx={styles.logo}>Tokenvest</Typography>
                </Link>
            </Box>
            <Box sx={styles.headerRoutes}>
                {ROUTES.map((item, index) => {
                    return (
                        <Link
                            key={index + 1}
                            href={item.slug}
                        >
                            <Typography variant="h5" sx={styles.logo}>{item.title}</Typography>
                        </Link>
                    )
                })}
                <TvButton customVariant="secondary">Connected</TvButton>
            </Box>
        </Box>
    )
};