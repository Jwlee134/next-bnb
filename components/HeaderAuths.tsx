import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import useModal from "~/hooks/useModal";
import { authActions } from "~/store/auth";
import AuthModal from "./auth/AuthModal";

const ButtonContainer = styled.div``;

const Button = styled.button<{ isLogin: boolean }>`
  height: 42px;
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

const HeaderAuths = () => {
  const dispatch = useDispatch();
  const { openModal, ModalPortal, closeModal } = useModal();
  return (
    <>
      <ButtonContainer>
        <Button
          isLogin={false}
          type="button"
          onClick={() => {
            dispatch(authActions.setAuthMode("signUp"));
            openModal();
          }}
        >
          회원가입
        </Button>
        <Button
          isLogin={true}
          type="button"
          onClick={() => {
            dispatch(authActions.setAuthMode("login"));
            openModal();
          }}
        >
          로그인
        </Button>
      </ButtonContainer>
      <ModalPortal>
        <AuthModal closeModal={closeModal} />
      </ModalPortal>
    </>
  );
};

export default HeaderAuths;
