import "@/styles/globals.css";
import dynamic from "next/dynamic";
import { ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { theme } from "../theme/theme";
import { Footer } from "@/components/Footer/Footer";
import { ReactNode, useState } from "react";
import { INotification, NotificationContext, initialNotifactionState } from "@/context/context";

const Header = dynamic(() => import("../components/Header/Header"), {
  ssr: false
});

const WalletConnectionProvider = dynamic<{ children: ReactNode }>(
  () =>
    import("../components/SolanaWallet/SolanaWallet").then(
      ({ SolanaWallet }) => SolanaWallet
    ),
  {
    ssr: false,
  }
);

export default function App({ Component, pageProps }: AppProps) {
  const [ notifications, setNotifactions ] = useState<INotification[]>(initialNotifactionState);
  return (
    <NotificationContext.Provider value={{ notifications, setNotifactions }}>
      <ThemeProvider theme={theme}>
        <WalletConnectionProvider>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </WalletConnectionProvider>
      </ThemeProvider>
    </NotificationContext.Provider>
  );
}
