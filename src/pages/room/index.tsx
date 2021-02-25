import { NextPage } from "next";
import React from "react";
import RoomMain from "src/components/room/main";
import { getRoomListAPI } from "src/lib/api/room";
import { roomActions } from "src/store/room";
import { searchRoomActions } from "src/store/searchRoom";

const Room: NextPage = () => {
  return <RoomMain />;
};

Room.getInitialProps = async ({ store, query }) => {
  const {
    location,
    checkInDate,
    checkOutDate,
    adultCount,
    childrenCount,
    infantsCount,
    latitude,
    longitude,
    limit,
    page = "1",
  } = query;
  try {
    const { data } = await getRoomListAPI({
      location: location ? encodeURI(location as string) : undefined,
      checkInDate,
      checkOutDate,
      adultCount,
      childrenCount,
      infantsCount,
      latitude,
      longitude,
      limit: limit || "20",
      page: page || "1",
    });
    store.dispatch(roomActions.setRooms(data));
    store.dispatch(
      searchRoomActions.setSearchRoom({
        location: location ? String(location) : "",
        latitude: latitude ? Number(latitude) : 0,
        longitude: longitude ? Number(longitude) : 0,
        checkInDate: checkInDate ? String(checkInDate) : null,
        checkOutDate: checkOutDate ? String(checkOutDate) : null,
        adultCount: adultCount ? Number(adultCount) : 1,
        childrenCount: childrenCount ? Number(childrenCount) : 0,
        infantsCount: infantsCount ? Number(infantsCount) : 0,
      })
    );
  } catch (error) {
    console.log(error);
  }
  return {};
};

export default Room;
