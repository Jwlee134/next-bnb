import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BedType } from "~/types/room";

interface State {
  largeBuildingType: string | null;
  buildingType: string | null;
  roomType: string | null;
  isForGuest: string | null;
  maximumGuestCount: number;
  bedroomCount: number;
  bedCount: number;
  bedList: { id: number; beds: { type: BedType; count: number }[] }[];
  publicBedList: { type: BedType; count: number }[];
}

const initialState: State = {
  largeBuildingType: null, // 건물 유형 큰 범주
  buildingType: null, // 건물 유형
  roomType: null, // 숙소 유형
  isForGuest: null, // 게스트 전용 여부
  maximumGuestCount: 1, // 최대 숙박 인원
  bedroomCount: 1, // 침실 개수
  bedCount: 1, // 침대 개수
  bedList: [], // 침대 유형
  publicBedList: [], // 공용공간 침대 유형
};

const registerRoom = createSlice({
  name: "registerRoom",
  initialState,
  reducers: {
    setlargeBuildingType: (state, action: PayloadAction<string>) => {
      state.largeBuildingType = action.payload;
    },
    setBuildingType: (state, action: PayloadAction<string>) => {
      if (action.payload === "") {
        state.buildingType = null;
        return;
      }
      state.buildingType = action.payload;
    },
    setRoomType: (
      state,
      action: PayloadAction<"entire" | "private" | "public">
    ) => {
      state.roomType = action.payload;
    },
    setIsForGuest: (state, action: PayloadAction<"yes" | "no">) => {
      state.isForGuest = action.payload;
    },
    setMaximumGuestCount: (state, action: PayloadAction<number>) => {
      state.maximumGuestCount = action.payload;
    },
    setBedroomCount: (state, action: PayloadAction<number>) => {
      state.bedroomCount = action.payload;
    },
    setBedCount: (state, action: PayloadAction<number>) => {
      state.bedCount = action.payload;
    },
  },
});

export const registerRoomActions = { ...registerRoom.actions };

export default registerRoom.reducer;
