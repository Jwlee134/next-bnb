import { User } from "./user";

export interface UserState extends User {
  isLogged: boolean;
}

export interface CommonState {
  validateMode: boolean;
}
