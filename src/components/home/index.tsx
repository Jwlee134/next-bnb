import React from "react";
import palette from "src/styles/palette";
import styled from "styled-components";
import SearchBar from "./searchBar";

const Container = styled.div`
  width: 100%;
  padding: 0px 80px;
`;

const SearchLabel = styled.p`
  margin: 32px 0px 16px;
  font-weight: 500;
  font-size: 14px;
`;

const Label = styled.p`
  width: 557px;
  margin: 80px 0px 60px;
  font-size: 50px;
  color: ${palette.cardinal};
  line-height: 1.2;
`;

const Home = () => {
  return (
    <Container>
      <SearchLabel>숙소</SearchLabel>
      <SearchBar />
      <Label>가까운 여행지, 에어비앤비와 탐험해보세요.</Label>
    </Container>
  );
};

export default Home;
