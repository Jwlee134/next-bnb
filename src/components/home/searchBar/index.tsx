import React from "react";
import palette from "src/styles/palette";
import styled from "styled-components";
import CheckIn from "./CheckIn";
import CheckOut from "./CheckOut";
import Guests from "./Guests";
import Location from "./Location";

const Container = styled.div`
  width: 100%;
  height: 70px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  display: flex;
  align-items: center;
  position: relative;
`;

const Divider = styled.div`
  width: 1px;
  height: 44px;
  background-color: ${palette.gray_dd};
`;

const SearchBar = () => {
  return (
    <Container>
      <Location />
      <Divider />
      <CheckIn />
      <Divider />
      <CheckOut />
      <Divider />
      <Guests />
    </Container>
  );
};

export default SearchBar;
