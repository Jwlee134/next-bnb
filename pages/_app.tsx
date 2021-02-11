import React from "react";
import { AppProps } from "next/dist/next-server/lib/router/router";
import App, { AppContext } from "next/app";

import GlobalStyles from "~/styles/GlobalStyles";
import Header from "~/components/Header";
import { wrapper } from "~/store";
import { cookieStringToObject } from "~/lib/utils";
import axios from "./api";
import { meAPI } from "~/lib/api/auth";
import { userActions } from "~/store/user";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <GlobalStyles />
    <Header />
    <Component {...pageProps} />
    <div id="portal" />
  </>
);

MyApp.getInitialProps = async (context: AppContext) => {
  const appInitialProps = await App.getInitialProps(context);
  const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie);
  const { store } = context.ctx;
  const { isLogged } = store.getState().user;
  try {
    if (!isLogged && cookieObject.access_token) {
      axios.defaults.headers.cookie = cookieObject.access_token;
      const { data } = await meAPI();
      store.dispatch(userActions.setLoggedUser(data));
    }
  } catch (error) {
    console.log(error);
  }

  return { ...appInitialProps };
};

export default wrapper.withRedux(MyApp);
