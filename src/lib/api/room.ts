import axios from "src/pages/api";
import { RoomType } from "src/types/room";
import { makeQueryString } from "../utils";

interface Query {
  location?: string | string[];
  checkInDate?: string | string[];
  checkOutDate?: string | string[];
  adultCount?: string | string[];
  childrenCount?: string | string[];
  infantsCount?: string | string[];
  latitude?: string | string[];
  longitude?: string | string[];
  limit: string | string[];
  page: string | string[];
}

export const registerRoomAPI = (body: RoomType & { hostId: number }) =>
  axios.post("api/room", body);

export const getRoomListAPI = (query: Query) =>
  axios.get<RoomType[]>(makeQueryString("/api/room", query));
