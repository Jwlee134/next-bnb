import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "src/types/reduxState";
import { User } from "src/types/user";

const initialState: UserState = {
  id: 0,
  email: "",
  lastname: "",
  firstname: "",
  birthday: "",
  profileImage: "",
  isLogged: false,
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedUser: (state, action: PayloadAction<User>) => {
      state = { ...action.payload, isLogged: true };
      return state;
    },
    initUser: (state) => {
      state = initialState;
      return state;
    },
  },
});

export const userActions = { ...user.actions };

export default user.reducer;
