import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../store";
import IBox from "../../../models/IBox";
import * as constant from "../../../constant";
import { keycloakClient } from "../../../utils";
import ICard from "../../../models/ICard";

interface CounterState {
  date: IBox[];
  cards: ICard[];
  boxTemp: string;
  search: string;
}

const initialState: CounterState = {
  date: [] as IBox[],
  cards: [] as ICard[],
  boxTemp: "" as string,
  search: "" as string,
};

export const counterSlice = createSlice({
  name: "box",
  initialState,
  reducers: {
    setApiResponse: (state, action: PayloadAction<any>) => {
      state.date = action.payload;
    },
    setCardByBox: (state, action: PayloadAction<any>) => {
      state.cards = action.payload as ICard[];
    },
    setBoxTemp: (state, action: PayloadAction<any>) => {
      state.boxTemp = action.payload;
    },
    setSearch: (state, action: PayloadAction<any>) => {
      state.search = action.payload;
    },
  },
});

export const {
  setApiResponse,
  setCardByBox,
  setBoxTemp,
  setSearch,
} = counterSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const getAllBoxes = (): AppThunk => (dispatch) => {
  fetch(constant.API_URL + "/app/box", {
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

export const getAllCardsByBox = (boxid: string): AppThunk => (dispatch) => {
  fetch(constant.API_URL + "/app/" + boxid + "/card", {
    headers: {
      Authorization: "Bearer " + keycloakClient.getToken(),
    },
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch(setCardByBox(data));
    })
    .catch(console.log);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectData = (state: RootState) => state.box.date;
export const selectStore = (state: RootState) => state.box;

export default counterSlice.reducer;
