import { createContext, Dispatch, SetStateAction } from "react";

export const initialNotifactionState = [];

export interface INotification {
  id: number;
  productId: string;
  message: string;
  openedStatus: boolean;
}

export interface INotificationContext {
  notifications: INotification[];
  setNotifactions: Dispatch<SetStateAction<INotification[]>>;
}

export const NotificationContext = createContext({
  notifications: initialNotifactionState,
  setNotifactions: () => {},
} as INotificationContext);
