import "@/styles/globals.css";
import dynamic from "next/dynamic";
import { Box, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { theme } from "../theme/theme";
import { appStyles } from "@/styles/App.styles";
import { Footer } from "@/components/Footer/Footer";
import { ReactNode } from "react";

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
  return (
    <ThemeProvider theme={theme}>
      <WalletConnectionProvider>
        <Header />
        <Box sx={appStyles.component}>
          <Component {...pageProps} />
        </Box>
        <Footer />
      </WalletConnectionProvider>
    </ThemeProvider>
  );
}
