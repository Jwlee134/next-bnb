import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from "react-redux";
import user from "./user";
import common from "./common";

const rootReducer = combineReducers({
  user,
  common,
});

const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    return nextState;
  }
  return rootReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

const initStore = () => configureStore({ reducer });

export const wrapper = createWrapper(initStore);
