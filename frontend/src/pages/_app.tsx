import "@/styles/globals.css";
import dynamic from "next/dynamic";
import { ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { theme } from "../theme/theme";

const Header = dynamic(() => import("../components/Header/Header"), {
  ssr: false
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Header/>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
