import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchRoomType } from "src/types/room";

const initialState: SearchRoomType = {
  location: "",
  latitude: 0,
  longitude: 0,
  checkInDate: null,
  checkOutDate: null,
  adultCount: 1,
  childrenCount: 0,
  infantsCount: 0,
};

const searchRoom = createSlice({
  name: "searchRoom",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
    setCheckInDate: (state, action: PayloadAction<string | null>) => {
      state.checkInDate = action.payload;
    },
    setCheckOutDate: (state, action: PayloadAction<string | null>) => {
      state.checkOutDate = action.payload;
    },
    setAdultCount: (state, action: PayloadAction<number>) => {
      state.adultCount = action.payload;
    },
    setChildrenCount: (state, action: PayloadAction<number>) => {
      state.childrenCount = action.payload;
    },
    setInfantsCount: (state, action: PayloadAction<number>) => {
      state.infantsCount = action.payload;
    },
    setLatitude: (state, action: PayloadAction<number>) => {
      state.latitude = action.payload;
    },
    setLongitude: (state, action: PayloadAction<number>) => {
      state.longitude = action.payload;
    },
    setSearchRoom: (state, action: PayloadAction<SearchRoomType>) => {
      state = action.payload;
      return state;
    },
  },
});

export const searchRoomActions = { ...searchRoom.actions };

export default searchRoom.reducer;
