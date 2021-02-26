import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RoomState } from "src/types/reduxState";
import { RoomType } from "src/types/room";

const initialState: RoomState = {
  rooms: [],
  detail: null,
};

const room = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRooms: (state, action: PayloadAction<RoomType[]>) => {
      state.rooms = action.payload;
    },
    setDetailRoom: (state, action: PayloadAction<RoomType>) => {
      state.detail = action.payload;
    },
  },
});

export const roomActions = { ...room.actions };

export default room.reducer;
