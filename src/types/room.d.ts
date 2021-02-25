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

export interface StoredRoomType extends RoomType {
  createdAt: Date;
  updatedAt: Date;
  hostId: number;
}

export interface RoomType {
  id: number;
  largeBuildingType: string | null;
  buildingType: string | null;
  roomType: string | null;
  isForGuest: string | null;
  maximumGuestCount: number;
  bedroomCount: number;
  bedCount: number;
  bedroomDetail: { id: number; beds: { type: BedType; count: number }[] }[];
  publicBedList: { type: BedType; count: number }[];
  bathroomCount: number;
  bathroomType: "private" | "public" | null;
  country: string;
  city: string;
  district: string;
  streetAddress: string;
  detailAddress: string;
  postcode: string;
  latitude: number;
  longitude: number;
  amentities: string[];
  conveniences: string[];
  photos: string[];
  description: string;
  title: string;
  price: number;
  startDate: string | null;
  endDate: string | null;
  anytime: boolean;
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
