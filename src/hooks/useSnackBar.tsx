import React, { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import InfoIcon from "../../public/static/svg/snackBar/info.svg";
import ErrorIcon from "../../public/static/svg/snackBar/error.svg";
import SuccessIcon from "../../public/static/svg/snackBar/success.svg";

interface ContainerProps {
  show: boolean;
  type: "success" | "error" | "info";
}

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

const getTypes = (type: "success" | "error" | "info") => {
  switch (type) {
    case "success":
      return css`
        background-color: #4caf50;
      `;
    case "error":
      return css`
        background-color: #f44336;
      `;
    case "info":
      return css`
        background-color: #2196f3;
      `;
    default:
      return css``;
  }
};

const Container = styled.div<ContainerProps>`
  ${({ type }) => getTypes(type)}
  svg {
    margin-right: 8px;
  }
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
  const [type, setType] = useState<"info" | "error" | "success">("info");
  const [text, setText] = useState("");

  const toggleShow = (
    value: boolean,
    barType?: "error" | "success" | "info",
    message?: string
  ) => {
    if (barType) setType(barType);
    if (message) setText(message);
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
      <Container show={show} type={type}>
        {type === "info" && <InfoIcon width="22" height="22" fill="white" />}
        {type === "error" && <ErrorIcon width="22" height="22" fill="white" />}
        {type === "success" && (
          <SuccessIcon width="22" height="22" fill="white" />
        )}
        {text}
      </Container>
    );
  };

  return { show, toggleShow, SnackBar };
};

export default useSnackBar;
