import "@/styles/globals.css";
import dynamic from "next/dynamic";
import { Box, Button, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { theme } from "../theme/theme";
import { appStyles } from "@/styles/App.styles";
import { Footer } from "@/components/Footer/Footer";
import { handleRequest, METHODS } from "../utils/handleRequest";

const Header = dynamic(() => import("../components/Header/Header"), {
  ssr: false
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Box sx={appStyles.component}>
        <Component {...pageProps} />
      </Box>
      <Footer />
      <Button onClick={async () => {
        const res = await handleRequest("http://localhost:3000/api/check-products", METHODS.GET);
        console.log(res, "RESRES");
      }} >TEST</Button>
    </ThemeProvider>
  );
}
