import { INVEST, INVEST_BOX_CAPTION } from "@/constants/general";
import { Dispatch, MouseEvent, SetStateAction, useContext, useState } from "react";
import { TvButton } from "../TvButton/TvButton";
import { TvInput } from "../TvInput/TvInput";
import { useSolana } from "@/hooks/useSolana";
import { NotificationContext } from "@/context/context";
import { METHODS, handleRequest } from "@/utils/handleRequest";
import { CMS_NOTIFICATIONS, EQUALS, FILTERS, NOTIFICATION_ADDRESS, POPULATE_ALL } from "@/constants/cms";
import { ICMSNotification } from "@/interfaces/cmsinterace";
import { useWallet } from "@solana/wallet-adapter-react";

interface ITvInvestBox {
  contractAddress: string;
  productId: string;
  ownerAddress: string;
  raiseGoal: string;
  resRaisedAmount: number;
  setResRaisedAmount: Dispatch<SetStateAction<number>>;
  closePopup: Function;
}

const TvInvestBox = ({
  productId,
  resRaisedAmount,
  setResRaisedAmount,
  closePopup
}: ITvInvestBox): JSX.Element => {

  const { invest } = useSolana();
  const { publicKey } = useWallet();

  const [ investAmount, setInvestAmount ] = useState(0);
  const { setNotifactions } = useContext(NotificationContext);

  const handleChange = (value: string, cb: Function) => {
    cb(value);
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleClick = async () => {
    await invest(investAmount, resRaisedAmount, setResRaisedAmount, productId);
    const { data = [] } =
      await handleRequest(
        `${process.env.NEXT_PUBLIC_CMS_API}${CMS_NOTIFICATIONS}${POPULATE_ALL}&${FILTERS}[${NOTIFICATION_ADDRESS}][${EQUALS}]=${publicKey}`,
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
    closePopup();
  };

  return (
    <div className="min-w-[295px] flex flex-col p-7 rounded-[20px] gap-2 bg-[#26545B]" onMouseDown={handleMouseDown}>
      <p>{INVEST_BOX_CAPTION}</p>
      <TvInput
        type="number"
        onChange={({ target: { value = "" } = {} }) => { handleChange(value, setInvestAmount); }}
      />
      <div className="max-w-[100px] w-full flex m-auto mt-[10px]">
        <TvButton onClick={handleClick}>{INVEST}</TvButton>
      </div>
    </div>
  );
};

export default TvInvestBox;
