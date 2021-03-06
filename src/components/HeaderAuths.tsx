import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import useModal from "src/hooks/useModal";
import { authActions } from "src/store/auth";
import palette from "src/styles/palette";
import AuthModal from "./auth/AuthModal";

const ButtonContainer = styled.div``;

const Button = styled.button<{ isLogin: boolean }>`
  height: 42px;
  padding: 0px 16px;
  border: 0;
  box-shadow: ${({ isLogin }) => isLogin && "0px 1px 2px rgba(0, 0, 0, 0.18)"};
  border-radius: 21px;
  background-color: white;
  cursor: pointer;
  outline: none;
  margin-right: ${(props) => !props.isLogin && "8px"};
  &:hover {
    box-shadow: ${({ isLogin }) =>
      isLogin && "0px 2px 8px rgba(0, 0, 0, 0.12)"};
    background-color: ${({ isLogin }) => !isLogin && palette.gray_f7};
  }
`;

const HeaderAuths = () => {
  const dispatch = useDispatch();
  const { openModal, ModalPortal, closeModal } = useModal();

  useEffect(() => {
    return () => {
      closeModal();
    };
  }, []);

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
