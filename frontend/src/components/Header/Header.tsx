import { PRODUCTS, ROUTES } from "@/constants/routes";
import { usePolkadot } from "@/hooks/usePolkadot";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { styles } from "./Header.styles";
import notification from "../../../public/notification.png";
import Image from "next/image";
import { TOKENVEST } from "@/constants/general";
import { useEffect, useState } from "react";
import { handleRequest, METHODS } from "@/utils/handleRequest";
import { CMS_API, CMS_NOTIFICATIONS, EQUALS, FILTERS, NOTIFICATION_ADDRESS, POPULATE_ALL } from "@/constants/cms";
import { SHIBUYA_ADDRESS } from "@/constants/polkadot";
import { useRouter } from "next/router";
import { ICMSNotification, INotification } from "@/interfaces/cmsinterace";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

const Header = (): JSX.Element => {

  const { allAccounts } = usePolkadot();
  const router = useRouter();
  const isConnected = allAccounts?.length !== 0;
  const [notifications, setNotifications] = useState([]);
  const [openNotification, setOpenNotification] = useState(false);
  const { publicKey } = useWallet();

  useEffect(() => {
    (async () => {
      const { data = [] } =
        await handleRequest(
          `${CMS_API}${CMS_NOTIFICATIONS}${POPULATE_ALL}&${FILTERS}[${NOTIFICATION_ADDRESS}][${EQUALS}]=${publicKey}`,
          METHODS.GET) ?? {};
      if (data.length > 0) {
        const filteredData = data.filter((item: ICMSNotification) => item.attributes.isOpened === false);
        const unreadNotifications = filteredData.map((item: ICMSNotification) => {
          return {
            id: item.id,
            message: item.attributes.message,
            isOpened: item.attributes.isOpened,
            productId: item.attributes.productId
          };
        }) || [];
        setNotifications(unreadNotifications);
      };
    })();
  }, []);

  const handleNotificationClick = () => {
    if (notifications.length === 0) {
      return;
    };
    setOpenNotification((state) => !state);
  };

  const handleOpenNotification = async (id: number, productId: string) => {
    const { date: openNotifData = {} } = await handleRequest(`${CMS_API}${CMS_NOTIFICATIONS}/${id}`, METHODS.PUT, {
      "data": {
        "isOpened": true,
      }
    }) ?? {};
    if (openNotifData) {
      router.push(`${PRODUCTS}/${productId}`);
    };
  };

  return (
    <Box sx={styles.header}>
      <Box sx={styles.headerLogo}>
        <Link href="/">
          <Typography variant="h5">{TOKENVEST}</Typography>
        </Link>
        <Box
          sx={styles.notificationWrapper}
          onClick={handleNotificationClick}
        >
          <Image src={notification.src} alt="" width={48} height={48} />
          {notifications.length > 0 ?
            <Box sx={styles.notificationCircle}>
              <Typography>{notifications.length}</Typography>
            </Box> : <></>}
          {openNotification ? <Box sx={styles.notificationMessages}>
            {notifications.map((item: INotification) =>
              <Typography
                sx={styles.notificationMessageText}
                onClick={() => handleOpenNotification(item.id, item.productId)}
                key={item.id}
              >{item.message}</Typography>
            )}
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
        <WalletMultiButton style={{ background: "#A259FF" }} />
      </Box>
    </Box>
  );
};

export default Header;
