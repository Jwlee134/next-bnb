import { RoomType } from "./room";
import { User } from "./user";

export interface UserState extends User {
  isLogged: boolean;
}

export interface CommonState {
  validateMode: boolean;
}

export interface RegisterRoomState {
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
}

export interface RoomState {
  rooms: RoomType[];
  detail: RoomType | null;
}
