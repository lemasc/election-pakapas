import "../styles/globals.css";
import "../styles/content.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { theme } from "../styles/theme";
import { usePageEvent } from "../utils/analytics";
import { useAuthInit } from "../utils/userStore";

function App({ Component, pageProps }: AppProps) {
  usePageEvent();
  useAuthInit();
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default App;
