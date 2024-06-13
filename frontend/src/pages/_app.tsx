import "@/styles/globals.css";
import dynamic from "next/dynamic";
import type { AppProps } from "next/app";
import Header from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { ReactNode, useState } from "react";
import { INotification, NotificationContext, initialNotifactionState } from "@/context/context";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <WalletConnectionProvider>
        <Head>
          <title>Tokenvest</title>
        </Head>
        <ToastContainer />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
      </WalletConnectionProvider>
    </NotificationContext.Provider>
  );
}

