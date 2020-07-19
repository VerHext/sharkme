import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../store";
import IUser from "../../../models/IUser";
import * as constant from "../../../constant";
import { keycloakClient } from "../../../utils";
interface CounterState {
  date: IUser;
  passwordUpdateStatus: number;
  emailUpdateStatus: number;
  nameUpdateStatus: number;
}

const initialState: CounterState = {
  date: {} as IUser,
  passwordUpdateStatus: 0,
  emailUpdateStatus: 0,
  nameUpdateStatus: 0,
};

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setApiResponse: (state, action: PayloadAction<any>) => {
      state.date = action.payload;
    },
    setPasswordUpdateResponse: (state, action: PayloadAction<any>) => {
      state.passwordUpdateStatus = action.payload;
    },
    setEmailUpdateResponse: (state, action: PayloadAction<any>) => {
      state.emailUpdateStatus = action.payload;
    },
    setNameUpdateResponse: (state, action: PayloadAction<any>) => {
      state.nameUpdateStatus = action.payload;
    },
  },
});

export const {
  setApiResponse,
  setPasswordUpdateResponse,
  setEmailUpdateResponse,
  setNameUpdateResponse,
} = counterSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const getApi = (): AppThunk => (dispatch) => {
  fetch(constant.API_URL + "/app/me", {
    headers: {
      Authorization: "Bearer " + keycloakClient.getToken(),
    },
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch(setApiResponse(data));
    })
    .catch(console.log);
};

export const updatePassword = (password: string): AppThunk => (dispatch) => {
  fetch(constant.API_URL + "/app/user/password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + keycloakClient.getToken(),
    },
    body: JSON.stringify({
      password,
    }),
  })
    .then((res) => {
      dispatch(setPasswordUpdateResponse(res.status));
      dispatch(getApi());
    })
    .catch(console.log);
};

export const updateEmail = (email: string): AppThunk => (dispatch) => {
  fetch(constant.API_URL + "/app/user/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + keycloakClient.getToken(),
    },
    body: JSON.stringify({
      email,
    }),
  })
    .then((res) => {
      dispatch(setEmailUpdateResponse(res.status));
      dispatch(getApi());
    })
    .catch(console.log);
};

export const updateName = (fname: string, lname: string): AppThunk => (
  dispatch
) => {
  fetch(constant.API_URL + "/app/user/name", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + keycloakClient.getToken(),
    },
    body: JSON.stringify({
      fname,
      lname,
    }),
  })
    .then((res) => {
      dispatch(setNameUpdateResponse(res.status));
      dispatch(getApi());
    })
    .catch(console.log);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectData = (state: RootState) => state.user.date;
export const selectStore = (state: RootState) => state.user;

export default counterSlice.reducer;
