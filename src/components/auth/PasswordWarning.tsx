import React from "react";
import styled from "styled-components";
import palette from "src/styles/palette";
import RedXIcon from "../../../public/static/svg/auth/red_x_icon.svg";
import GreenCheckIcon from "../../../public/static/svg/auth/green_check_icon.svg";

const Container = styled.p<{ isValid: boolean }>`
  color: ${({ isValid }) =>
    isValid ? palette.green : palette.davidson_orange};
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-bottom: 4px;
  svg {
    margin-right: 8px;
  }
`;

interface Props {
  isValid: boolean;
  text: string;
}

const PasswordWarning = ({ isValid, text }: Props) => {
  return (
    <Container isValid={isValid}>
      {isValid ? <GreenCheckIcon /> : <RedXIcon />}
      {text}
    </Container>
  );
};

export default PasswordWarning;
