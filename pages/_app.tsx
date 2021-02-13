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

// 이 컴포넌트에서 작성하는 로직들은 모든 페이지에서 적용된다.
// 아래의 로직은 어느 페이지에서나 새로고침(서버 사이드 렌더링 시작)을 하더라도
// 서버 사이드에서 초기화된 리덕스 스토어에 다시 유저 정보를 넣어주는 것
// https://nextjs.org/docs/advanced-features/custom-app
// https://velog.io/@bigbrothershin/Next.js-SSR-cookie-%EB%84%A3%EC%96%B4%EC%A3%BC%EA%B8%B0
// https://davidhwang.netlify.app/TIL/(0320)nextjs%EC%97%90%EC%84%9C-next-cookies-%EC%82%AC%EC%9A%A9-%EC%9D%B4%EC%8A%88/

MyApp.getInitialProps = async (context: AppContext) => {
  const appInitialProps = await App.getInitialProps(context);
  const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie);
  const { store } = context.ctx; // next-redux-wrapper 덕분에 store 사용 가능
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
