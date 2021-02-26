import { RegisterRoomState } from "./reduxState";
import { User } from "./user";

export type BedType =
  | "소파"
  | "에어 매트릭스"
  | "요와 이불"
  | "싱글"
  | "더블"
  | "퀸"
  | "이층 침대"
  | "바닥용 에어매트릭스"
  | "유아용 침대"
  | "해먹"
  | "물침대";

export interface StoredRoomType extends RegisterRoomState {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  hostId: number;
  host: User;
}

export interface RoomType extends RegisterRoomState {
  id: number;
  createdAt: string;
  updatedAt: string;
  host: User;
}

export interface SearchRoomType {
  location: string;
  latitude: number;
  longitude: number;
  checkInDate: string | null;
  checkOutDate: string | null;
  adultCount: number;
  childrenCount: number;
  infantsCount: number;
}
