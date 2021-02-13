import React from "react";
import styled from "styled-components";
import palette from "~/styles/palette";

const Container = styled.button`
  width: 100%;
  height: 48px;
  border: 0;
  border-radius: 4px;
  background-color: ${palette.bittersweet};
  color: white;
  font-size: 16px;
  font-weight: 500;
  outline: none;
  cursor: pointer;
`;

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = ({ children, ...props }: Props) => {
  return <Container {...props}>{children}</Container>;
};

export default React.memo(Button); // props의 값이 같다면 리렌더링을 방지하는 목적
