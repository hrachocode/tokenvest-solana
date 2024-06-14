import { HOME, PRODUCTS, ROUTES } from "@/constants/routes";
import Link from "next/link";
import notification from "../../../public/images/notification.png";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import { handleRequest, METHODS } from "@/utils/handleRequest";
import { CMS_API, CMS_NOTIFICATIONS, EQUALS, FILTERS, NOTIFICATION_ADDRESS, POPULATE_ALL } from "@/constants/cms";
import { useRouter } from "next/router";
import { ICMSNotification, INotification } from "@/interfaces/cmsinterace";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { NotificationContext } from "@/context/context";
import tokenvest from "../../../public/images/tokenvest.svg";
import burgerMenu from "../../../public/images/burger_menu.svg";
import closeIcon from "../../../public/images/close.svg";
import SquaresEffect from "../SquaresEffect/SquaresEffect";
import IsAuthenticated from "../IsAuthenticated/IsAuthenticated";

const Header = (): JSX.Element => {
  const router = useRouter();
  const { publicKey } = useWallet();
  const [ openNotification, setOpenNotification ] = useState(false);
  const { notifications, setNotifactions } = useContext(NotificationContext);
  const [ isOpen, setIsOpen ] = useState(false);
  const animationRef = useRef<HTMLDivElement | null>(null);
  const isHomePage = router.pathname === HOME;

  useEffect(() => {
    (async () => {
      const { data = [] } =
        await handleRequest(
          `${process.env.NEXT_PUBLIC_CMS_URL}${CMS_API}${CMS_NOTIFICATIONS}${POPULATE_ALL}&${FILTERS}[${NOTIFICATION_ADDRESS}][${EQUALS}]=${publicKey}`,
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
  }, [ publicKey, setNotifactions ]);

  const handleNotificationClick = () => {
    if (notifications.length === 0) {
      return;
    } else if (isOpen) {
      setIsOpen(false);
    }
    setOpenNotification((state) => !state);
  };
  const handleOpenNotification = async (id: number, productId: string) => {
    const { date: openNotifData = {} } = await handleRequest(`${process.env.NEXT_PUBLIC_CMS_URL}${CMS_API}${CMS_NOTIFICATIONS}/${id}`, METHODS.PUT, {
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

  const toggleNavbar = () => {
    openNotification && setOpenNotification(false);
    setIsOpen(!isOpen);
  };

  return (
    <header ref={animationRef} className="flex justify-between items-center p-[10px_30px] md:p-[18px_60px] lg:p-[25px_80px] border-b-[1px] border-textPrimary border-opacity-[20%]">
      {isHomePage && <SquaresEffect animationRef={animationRef} />}
      <div className="flex items-center z-40">
        <Link href={HOME}>
          <Image src={tokenvest} alt="tokenvest" width={0} height={0} sizes="100vw" className="mr-[20px] w-[95px] lg:w-[115px] object-cover" />
        </Link>
        {/* <div
          className="relative cursor-pointer"
          onClick={handleNotificationClick}
        >
          <Image src={notification.src} alt="" width={0} height={0} sizes="100vw" className="w-[35px] md:w-[48px]" />
          {notifications.length > 0 ?
            <div
              className="secondaryFlex absolute bottom-[-5px] md:bottom-[-10px] right-[-9px] md:right-[-17px] rounded-[50%] w-[25px] md:w-[30px] h-[25px] md:h-[30px] bg-red-600"
            >
              <p>{notifications.length}</p>
            </div> : <></>}
          {openNotification ? <div
            className="flex flex-col w-[350px] md:w-[500px] absolute top-[60px] md:top-[70px] lg:top-[55px] left-[-140px] md:left-[60px] z-10 p-4 bg-[#26545B] rounded-[10px]"
          >
            {notifications.map((item: INotification) =>
              <p
                className="text-textPrimary hover:text-white"
                onClick={() => handleOpenNotification(item.id, item.productId)}
                key={item.id}
              >{item.message}</p>
            )}
          </div> : <></>}
        </div> */}
      </div>
      <div className="flex items-center z-40">
        <div className="md:hidden block">
          {
            !isOpen ? <Image alt="nav" src={burgerMenu} width={40} height={40} onClick={toggleNavbar} /> :
              <Image alt="close" src={closeIcon} width={40} height={40} onClick={toggleNavbar} />
          }
        </div>
        <div className={`${isOpen ? "top-[75px] left-0 opacity-100" : ""} secondaryFlex flex-col md:flex-row md:static absolute w-full left-0 md:py-0 py-4 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500 bg-backgroundPrimary md:bg-transparent `}>
          {
            ROUTES.map(({ slug, title }) =>
              <Link
                className="hover:underline decoration-2 decoration-[#79FDFF] underline-offset-[16px] text-[16px] md:text-[20px] p-2 md:p-4 hover:text-textPrimary"
                key={slug}
                href={slug}
                onClick={toggleNavbar}
              >
                <p>{title}</p>
              </Link>
            )}
          <IsAuthenticated isOpen={isOpen} setIsOpen={setIsOpen} />
          <WalletMultiButton style={{ background: "#28dbd1", marginLeft: "10px", borderRadius: "8px", transform: "skew(-12deg)" }} />
        </div>
      </div >
    </header >
  );
};

export default Header;
