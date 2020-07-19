import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "./modules/counter";
import userReducer from "./modules/user";
import boxReducer from "./modules/box";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    box: boxReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
