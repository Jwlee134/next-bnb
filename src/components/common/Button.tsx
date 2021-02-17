import React from "react";
import styled, { css } from "styled-components";
import palette from "src/styles/palette";

const normalType = css`
  width: 100%;
  background-color: ${palette.bittersweet};
  color: white;
  border: 0;
`;

const registerType = css`
  width: 161px;
  border: 1px solid ${palette.gray_c4};
  background-color: white;
  color: ${palette.gray_48};
`;

const Container = styled.button<{ styleType: "normal" | "register" }>`
  ${({ styleType }) => (styleType === "normal" ? normalType : registerType)}
  height: 48px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.div`
  margin-top: 4px;
  margin-right: 10px;
`;

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  style?: Object;
  styleType?: "normal" | "register";
  icon?: JSX.Element;
}

const Button = ({
  children,
  style,
  styleType = "normal",
  icon,
  ...props
}: Props) => {
  return (
    <Container style={style} styleType={styleType} {...props}>
      {icon && <Icon>{icon}</Icon>}
      {children}
    </Container>
  );
};

export default React.memo(Button); // props의 값이 같다면 리렌더링을 방지하는 목적
