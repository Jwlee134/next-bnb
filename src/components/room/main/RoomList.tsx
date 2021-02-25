import React from "react";
import { useSelector } from "src/store";
import styled from "styled-components";
import RoomCard from "./RoomCard";

const Container = styled.div`
  width: 100%;
  padding-top: 50px;
  display: flex;
  flex-wrap: wrap;
`;

const RoomList = ({ showMap }: { showMap: boolean }) => {
  const rooms = useSelector((state) => state.room.rooms);
  return (
    <Container>
      {rooms.map((room) => (
        <RoomCard room={room} showMap={showMap} key={room.id} />
      ))}
    </Container>
  );
};

export default RoomList;
