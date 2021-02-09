import React from "react";
import styled from "styled-components";
import palette from "~/styles/palette";

const Container = styled.div<{ icon: JSX.Element | undefined }>`
  position: relative;
  input {
    width: 100%;
    height: 46px;
    padding: ${({ icon }) => (icon ? "0 44px 0 11px" : "0 11px")};
    border: 1px solid ${palette.gray_eb};
    border-radius: 4px;
    font-size: 16px;
    outline: none;
    font-family: Noto Sans KR;
    ::placeholder {
      color: ${palette.gray_76};
    }
    &:focus {
      border-color: ${palette.dark_cyan};
    }
  }
`;

const IconContainer = styled.div`
  position: absolute;
  right: 13px;
  top: 13px;
`;

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: JSX.Element;
  style?: Object;
}

const Input = ({ icon, style, ...props }: Props) => {
  return (
    <Container icon={icon} style={style}>
      <input {...props} />
      <IconContainer>{icon}</IconContainer>
    </Container>
  );
};

export default Input;
