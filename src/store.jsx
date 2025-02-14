import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from "./store/userSlice.jsx";

let cart = createSlice({
  name: "cart",
  initialState: [
    { id: 3, name: "White and Black", count: 2 },
    { id: 4, name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    changeCount(state, action) {
      let correctN = state.findIndex((item) => {
        return item.id === action.payload;
      });
      console.log(correctN);
      state[correctN].count++;
    },
    updateCart(state, action) {
      //return [...state, action.payload];
      state.push(action.payload);
    },
  },
});

export let { changeCount, updateCart } = cart.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    cart: cart.reducer,
  },
});
