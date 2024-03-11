import { ToastOptions, toast } from "react-toastify";

export const showNotification = (message: string, type?: string) => {
  const notifyConfig: ToastOptions = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };
  type === "error"
    ? toast.error(message, notifyConfig)
    : toast.success(message, notifyConfig);
};
