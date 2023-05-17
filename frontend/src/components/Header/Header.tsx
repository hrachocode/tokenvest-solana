import { ROUTES } from "@/constants/routes";
import { usePolkadot } from "@/hooks/usePolkadot";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { TvButton } from "../TvButton/TvButton";
import { styles } from "./Header.styles";
import notification from "../../../public/notification.png";
import Image from "next/image";
import { TOKENVEST } from "@/constants/general";
import { useEffect, useState } from "react";
import { handleRequest, METHODS } from "@/utils/handleRequest";
import { CMS_API, CMS_NOTIFICATIONS, CMS_PRODUCTS, POPULATE_ALL } from "@/constants/cms";
import { SHIBUYA_ADDRESS } from "@/constants/polkadot";

const Header = (): JSX.Element => {

  const { allAccounts } = usePolkadot();
  const isConnected = allAccounts?.length !== 0;
  const [ notifications, setNotifications ] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } =
        await handleRequest(`${CMS_API}${CMS_NOTIFICATIONS}${POPULATE_ALL}&filters[address][$eq]=${SHIBUYA_ADDRESS}`, METHODS.GET);
      if (data.length > 0) {
        setNotifications(data);
      };
    })();
  }, []);

  return (
    <Box sx={styles.header}>
      <Box sx={styles.headerLogo}>
        <Link href="/">
          <Typography variant="h5">{TOKENVEST}</Typography>
        </Link>
        <Box sx={styles.notificationWrapper}>
          <Image src={notification.src} alt="" width={48} height={48} />
          {notifications.length > 0 ?
            <Box sx={styles.notificationCircle}>
              <Typography>{notifications.length}</Typography>
            </Box> : <></>}
        </Box>
      </Box>
      <Box sx={styles.headerRoutes}>
        {ROUTES.map((item, index) =>
          <Link
            key={index + 1}
            href={item.slug}
          >
            <Typography variant="h5">{item.title}</Typography>
          </Link>
        )}
        <TvButton customVariant="secondary">{isConnected ? "Connected" : "Not Connected"}</TvButton>
      </Box>
    </Box>
  );
};

export default Header;
