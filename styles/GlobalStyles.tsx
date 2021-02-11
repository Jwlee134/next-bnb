import { createGlobalStyle, css } from "styled-components";
import reset from "styled-reset";
import palette from "./palette";

const globalStyles = css`
  ${reset}
  * {
    box-sizing: border-box;
    font-family: Noto Sans KR, Ubuntu;
  }
  body {
    color: ${palette.black};
    font-family: Noto Sans KR, Ubuntu;
  }
  a {
    text-decoration: none;
    color: ${palette.black};
  }
`;

const GlobalStyles = createGlobalStyle`${globalStyles}`;

export default GlobalStyles;
