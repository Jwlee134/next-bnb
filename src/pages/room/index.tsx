import { NextPage } from "next";
import React from "react";
import RoomMain from "src/components/room/main";

const Room: NextPage = () => {
  return <RoomMain />;
};

Room.getInitialProps = async ({ query }) => {
  console.log(query);
  return {};
};

export default Room;
