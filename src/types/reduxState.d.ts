import { RoomType } from "./room";
import { User } from "./user";

export interface UserState extends User {
  isLogged: boolean;
}

export interface CommonState {
  validateMode: boolean;
}

export interface RoomState {
  rooms: RoomType[];
}
