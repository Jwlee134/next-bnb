import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "~/types/reduxState";
import { User } from "~/types/user";

const initialState: UserState = {
  id: 0,
  email: "",
  lastname: "",
  firstname: "",
  birthday: "",
  profileImage: "",
  isLogged: false,
};

const userSlice = createSlice({
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

export const userActions = { ...userSlice.actions };

export default userSlice.reducer;
