import React from "react";
import palette from "src/styles/palette";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 70px;
  border: 2px solid transparent;
  border-radius: 12px;
  cursor: pointer;
  &:hover {
    border-color: ${palette.gray_dd};
  }
`;

const Location = () => {
  return <Container>위치</Container>;
};

export default Location;