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
  bedroomDetail: { id: number; beds: { type: BedType; count: number }[] }[];
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
  bedroomDetail: [{ id: 1, beds: [] }], // 침대 유형
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
      // 침실 개수는 기본적으로 1개 (그러면 bedroomDetail도 1개)
      if (state.bedroomDetail.length < action.payload) {
        // 만약 침실 개수를 5개로 늘렸다면 (bedroomDetail = 1 < action.payload = 5)
        // bedroomDetail을 2부터 5까지 반복문으로 생성
        for (
          let i = state.bedroomDetail.length + 1;
          i < action.payload + 1;
          i++
        ) {
          state.bedroomDetail.push({ id: i, beds: [] });
        }
      } else {
        // 만약 침실 개수를 2개로 줄였다면 (bedroomDetail = 5 > action.payload = 2)
        // bedroomDetail의 index 0 ~ 1 까지 추출하여 새로운 배열로 반환
        // slice(0, 2)에서 index 2는 미포함
        state.bedroomDetail = state.bedroomDetail.slice(0, action.payload);
      }
    },
    setBedCount: (state, action: PayloadAction<number>) => {
      state.bedCount = action.payload;
    },
    setBedType: (
      state,
      action: PayloadAction<{ id: number; type: BedType }>
    ) => {
      const { id, type } = action.payload;
      state.bedroomDetail[id - 1].beds.push({ type, count: 1 });
    },
    setBedTypeCount: (
      state,
      action: PayloadAction<{ value: number; id: number; type: string }>
    ) => {
      const { value, id, type } = action.payload;
      // 해당 type을 가진 항목의 index
      const index = state.bedroomDetail[id - 1].beds.findIndex(
        (bed) => bed.type === type
      );
      state.bedroomDetail[id - 1].beds[index].count = value;
      // 카운트가 0이면 해당 index의 항목을 삭제
      if (value === 0) {
        state.bedroomDetail[id - 1].beds.splice(index, 1);
      }
    },
    setPublicBedList: (state, action: PayloadAction<BedType>) => {
      state.publicBedList.push({ type: action.payload, count: 1 });
    },
    setPublicBedCount: (
      state,
      action: PayloadAction<{ value: number; type: BedType }>
    ) => {
      const { value, type } = action.payload;
      const index = state.publicBedList.findIndex((bed) => bed.type === type);
      if (value !== 0) {
        state.publicBedList[index].count = value;
      } else {
        state.publicBedList.splice(index, 1);
      }
    },
  },
});

export const registerRoomActions = { ...registerRoom.actions };

export default registerRoom.reducer;
