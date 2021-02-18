import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { useSelector } from "src/store";
import LogoIcon from "../../public/static/svg/logo/logo.svg";
import LogoTextIcon from "../../public/static/svg/logo/logo_text.svg";
import HeaderAuths from "./HeaderAuths";
import HeaderUserProfile from "./HeaderUserProfile";

const Container = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 80px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;
  z-index: 10;
  div:last-child {
    position: relative;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Header = () => {
  const { isLogged } = useSelector((state) => state.user);
  return (
    <>
      <Container>
        <Link href="/">
          <LogoContainer>
            <LogoIcon style={{ marginRight: 6 }} />
            <LogoTextIcon />
          </LogoContainer>
        </Link>
        {!isLogged && <HeaderAuths />}
        {isLogged && <HeaderUserProfile />}
      </Container>
    </>
  );
};

export default Header;
