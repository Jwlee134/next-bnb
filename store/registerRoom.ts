import { createSlice } from "@reduxjs/toolkit";

interface State {
  largeBuildingType: string | null;
  buildingType: string | null;
  roomType: string | null;
  isForGuest: boolean | null;
}

const initialState: State = {
  largeBuildingType: null, // 건물 유형 큰 범주
  buildingType: null, // 건물 유형
  roomType: null, // 숙소 유형
  isForGuest: null, // 게스트 전용 여부
};

const registerRoom = createSlice({
  name: "registerRoom",
  initialState,
  reducers: {},
});

export const registerRoomActions = { ...registerRoom.actions };

export default registerRoom.reducer;
