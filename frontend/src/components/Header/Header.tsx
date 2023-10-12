import { HOME, PRODUCTS, ROUTES } from "@/constants/routes";
import Link from "next/link";
import notification from "../../../public/images/notification.png";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { handleRequest, METHODS } from "@/utils/handleRequest";
import { CMS_API, CMS_NOTIFICATIONS, EQUALS, FILTERS, NOTIFICATION_ADDRESS, POPULATE_ALL } from "@/constants/cms";
import { useRouter } from "next/router";
import { ICMSNotification, INotification } from "@/interfaces/cmsinterace";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { NotificationContext } from "@/context/context";
import tokenvest from "../../../public/images/tokenvest.svg";

const Header = (): JSX.Element => {
  const router = useRouter();
  const { publicKey } = useWallet();
  const [ openNotification, setOpenNotification ] = useState(false);
  const { notifications, setNotifactions } = useContext(NotificationContext);

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
        setNotifactions([ ...unreadNotifications ]);
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
    if (notifications.length > 0) {
      const nextNotifactions = notifications.filter(({ id: notifId }: { id: number }) => {
        return notifId !== id;
      });
      setNotifactions([ ...nextNotifactions ]);
    }
    if (openNotifData) {
      router.push(`${PRODUCTS}/${productId}`);
    };
  };

  return (
    <header className="flex justify-between items-center px-[80px] py-[24px] border-b-[1px] border-textPrimary border-opacity-[20%]">
      <div className="flex items-center z-10">
        <Link href={HOME}>
          <Image src={tokenvest} alt="tokenvest" width={0} height={0} sizes="100vw" className="mr-[20px]" />
        </Link>
        <div
          className="relative cursor-pointer"
          onClick={handleNotificationClick}
        >
          <Image src={notification.src} alt="" width={48} height={48} />
          {notifications.length > 0 ?
            <div
              className=" flex absolute justify-center items-center bottom-[-10px] right-[-17px] rounded-[50%] w-[30px] h-[30px] bg-red-600"
            >
              <p>{notifications.length}</p>
            </div> : <></>}
          {openNotification ? <div
            className="flex flex-col gap-1 w-[500px] absolute top-[60px] left-[50px] z-10 p-4 bg-[#26545B] rounded-[10px]"
          >
            {notifications.map((item: INotification) =>
              <p
                className="text-textPrimary hover:text-white"
                onClick={() => handleOpenNotification(item.id, item.productId)}
                key={item.id}
              >{item.message}</p>
            )}
          </div> : <></>}
        </div>
      </div>
      <div className="flex justify-center items-center">
        {
          ROUTES.map((item, index) =>

            <Link
              className={item.title === "Add Project" ? "secondaryButton" : "hover:underline decoration-2 decoration-[#79FDFF] underline-offset-[16px] text-[20px] p-4 hover:text-textPrimary"}
              key={index + 1}
              href={item.slug}
            >
              <p>{item.title}</p>
            </Link>
          )}
        <WalletMultiButton style={{ background: "#28dbd1", marginLeft: "25px", borderRadius: "5px", transform: "skew(-15deg) " }} />
      </div>
    </header>
  );
};

export default Header;
