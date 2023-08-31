import { createContext, Dispatch, SetStateAction } from "react";

export const initialNotifactionState = [];

export type INotification = {
    id: number;
    productId: string,
    message: string;
    openedStatus: boolean;
}

export interface INotificationContext {
    notifaction: INotification[],
    setNotifaction: Dispatch<SetStateAction<INotification[]>>
}

export const NotificationContext = createContext({ notifaction: initialNotifactionState, setNotifaction: () => { } } as INotificationContext);
