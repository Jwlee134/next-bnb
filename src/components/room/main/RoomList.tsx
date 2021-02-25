import React from "react";
import { useSelector } from "src/store";
import styled, { css } from "styled-components";
import RoomCard from "./RoomCard";

const Container = styled.div<{ showMap: boolean }>`
  width: 100%;
  padding-top: 50px;
  display: flex;
  flex-wrap: wrap;
  ${({ showMap }) =>
    showMap &&
    css`
      flex-direction: column;
    `}
`;

const RoomList = ({ showMap }: { showMap: boolean }) => {
  const rooms = useSelector((state) => state.room.rooms);
  return (
    <Container showMap={showMap}>
      {rooms.map((room) => (
        <RoomCard room={room} showMap={showMap} key={room.id} />
      ))}
    </Container>
  );
};

export default RoomList;
