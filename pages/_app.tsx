import React from "react";
import { AppProps } from "next/dist/next-server/lib/router/router";

import GlobalStyles from "~/styles/GlobalStyles";
import Header from "~/components/Header";
import { wrapper } from "~/store";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <GlobalStyles />
    <Header />
    <Component {...pageProps} />
    <div id="portal" />
  </>
);

export default wrapper.withRedux(MyApp);
