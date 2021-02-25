import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RoomState } from "src/types/reduxState";
import { RoomType } from "src/types/room";

const initialState: RoomState = {
  rooms: [],
};

const room = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRooms: (state, action: PayloadAction<RoomType[]>) => {
      state.rooms = action.payload;
    },
  },
});

export const roomActions = { ...room.actions };

export default room.reducer;
