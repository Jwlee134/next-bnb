import axios from "src/pages/api";
import { RoomType } from "src/types/room";

export const registerRoomAPI = (body: RoomType & { hostId: number }) =>
  axios.post("api/room", body);
