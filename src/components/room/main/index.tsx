import { format } from "date-fns";
import React, { useState } from "react";
import { useSelector } from "src/store";
import palette from "src/styles/palette";
import styled from "styled-components";
import MapIcon from "../../../../public/static/svg/room/main/map.svg";
import RoomList from "./RoomList";

const Container = styled.div`
  padding: 50px 80px;
  margin: auto;
`;

const RoomListInfo = styled.p`
  margin-bottom: 8px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 24px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  height: 42px;
  padding: 12px;
  background-color: white;
  cursor: pointer;
  outline: none;
  border: 0;
  border-radius: 8px;
  &:hover {
    background-color: ${palette.gray_f7};
  }
  svg {
    margin-right: 8px;
    margin-top: 2px;
  }
`;

const LeftSide = styled.div`
  display: flex;
  ${Button} {
    height: 36px;
    padding: 0px 16px;
    margin-right: 8px;
    border-radius: 30px;
    border: 1px solid ${palette.gray_b0};
    &:hover {
      border-color: ${palette.black};
      background-color: white;
    }
  }
`;

const ListContainer = styled.div`
  display: flex;
`;

const RoomMain = () => {
  const { rooms } = useSelector((state) => state.room);
  const { checkInDate, checkOutDate } = useSelector(
    (state) => state.searchRoom
  );

  const [showMap, setShowMap] = useState(false);

  const getRoomListInfo = `${rooms.length}개의 숙소 ${
    checkInDate ? format(new Date(checkInDate), "· MM월 dd일") : ""
  } ${checkOutDate ? format(new Date(checkOutDate), " - MM월 dd일") : ""}`;

  return (
    <Container>
      <RoomListInfo>{getRoomListInfo}</RoomListInfo>
      <Title>숙소</Title>
      <ButtonContainer>
        <LeftSide>
          <Button>숙소 유형</Button>
          <Button>요금</Button>
        </LeftSide>
        <Button onClick={() => setShowMap(!showMap)}>
          <MapIcon />
          지도 표시하기
        </Button>
      </ButtonContainer>
      <ListContainer>
        <RoomList showMap={showMap} />
      </ListContainer>
    </Container>
  );
};

export default RoomMain;
