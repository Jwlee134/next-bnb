import React, { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import InfoIcon from "../../public/static/svg/snackBar/info.svg";

const up = keyframes`
    0% {
        transform: translateY(100px);
    }
    100% {
        transform: translateY(-10px);
    }
`;

const down = keyframes`
    0% {
        transform: translateY(-10px);
    }
    100% {
        transform: translateY(100px);
    }
`;

const Container = styled.div<{ show: boolean }>`
  svg {
    margin-right: 8px;
  }
  background-color: #2196f3;
  position: fixed;
  bottom: 20px;
  right: 50%;
  height: 50px;
  color: white;
  display: flex;
  align-items: center;
  width: 300px;
  margin-right: -150px;
  border-radius: 4px;
  padding: 6px 16px;
  font-weight: 500;
  box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%),
    0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%);
  ${({ show }) =>
    show
      ? css`
          animation: ${up} 0.2s ease-in-out forwards;
        `
      : css`
          animation: ${down} 0.2s ease-in-out forwards;
        `}
`;

const useSnackBar = () => {
  const [show, setShow] = useState(false);
  const [animate, setAnimate] = useState(false);

  const toggleShow = (value: boolean) => {
    setShow(value);
    if (value) {
      setAnimate(true);
    } else {
      setTimeout(() => {
        setAnimate(false);
      }, 200);
    }
  };

  const SnackBar = () => {
    if (!animate && !show) return null;
    return (
      <Container show={show}>
        <InfoIcon width="22" height="22" fill="white" />
        사진을 업로드 중입니다.
      </Container>
    );
  };

  return { show, toggleShow, SnackBar };
};

export default useSnackBar;
