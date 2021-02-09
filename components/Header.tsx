import React from "react";
import styled from "styled-components";
import Link from "next/link";

import LogoIcon from "~/public/static/svg/logo/logo.svg";
import LogoTextIcon from "~/public/static/svg/logo/logo_text.svg";
import SignUpModal from "./auth/SignUpModal";
import useModal from "~/hooks/useModal";

const Container = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 50px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;
  z-index: 10;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ButtonContainer = styled.div``;

const Button = styled.button<{ isLogin: boolean }>`
  height: 42px;
  font-family: Noto Sans KR;
  padding: 0px 16px;
  border: 0;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
  border-radius: 21px;
  background-color: white;
  cursor: pointer;
  outline: none;
  margin-right: ${(props) => !props.isLogin && "8px"};
  &:hover {
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  }
`;

const Header = () => {
  const { openModal, ModalPortal, closeModal } = useModal();
  return (
    <>
      <Container>
        <Link href="/">
          <LogoContainer>
            <LogoIcon style={{ marginRight: 6 }} />
            <LogoTextIcon />
          </LogoContainer>
        </Link>
        <ButtonContainer>
          <Button isLogin={false} type="button" onClick={openModal}>
            회원가입
          </Button>
          <Button isLogin={true} type="button" onClick={openModal}>
            로그인
          </Button>
        </ButtonContainer>
      </Container>
      <ModalPortal>
        <SignUpModal closeModal={closeModal} />
      </ModalPortal>
    </>
  );
};

export default Header;
