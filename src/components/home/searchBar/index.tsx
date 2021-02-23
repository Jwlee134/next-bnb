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
  // 아래의 컴포넌트들에서는 useSelector를 따로따로 분리해서 선언해줘야 한다.
  // 이 컴포넌트를 부모로 해서 같은 자식 위치에 존재하고 있기 때문에
  // const {} = useSelector((state) => state.searchRoom) 이렇게 하면
  // 중괄호 내의 상태가 바뀔 때마다 searchRoom 전체가 리렌더링되기 때문에
  // 아래의 컴포넌트 하나라도 상태가 바뀔 때마다 전체가 리렌더링되어 버린다.
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
