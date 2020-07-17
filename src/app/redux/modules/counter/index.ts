import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../store";

interface CounterState {
  value: number;
  date: any;
}

const initialState: CounterState = {
  value: 0,
  date: "",
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    clear: (state) => {
      state.value = 0;
    },
    setApiResponse: (state, action: PayloadAction<any>) => {
      state.date = action.payload;
    },
  },
});

export const {
  increment,
  decrement,
  incrementByAmount,
  clear,
  setApiResponse,
} = counterSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = (amount: number): AppThunk => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

export const getApi = (): AppThunk => (dispatch) => {
  fetch("http://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((data) => {
      dispatch(setApiResponse(data));
    })
    .catch(console.log);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state: RootState) => state.counter.value;
export const selectData = (state: RootState) => state.counter.date;

export default counterSlice.reducer;
