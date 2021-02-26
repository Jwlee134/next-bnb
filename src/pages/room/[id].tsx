import { NextPage } from "next";
import React from "react";
import Detail from "src/components/room/detail";
import { getRoomAPI } from "src/lib/api/room";
import { roomActions } from "src/store/room";

const RoomDetail: NextPage = () => {
  return <Detail />;
};

RoomDetail.getInitialProps = async ({ query, store }) => {
  const { id } = query;
  try {
    if (id) {
      const { data } = await getRoomAPI(Number(id));
      store.dispatch(roomActions.setDetailRoom(data));
    }
  } catch (error) {
    console.log(error);
  }
  return {};
};

export default RoomDetail;
