import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
} from "./thunks";

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    clearCartLocal(state) {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.status = "succeeded";
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch cart";
      })

      .addCase(addCartItem.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.status = "succeeded";
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const updatedItem = action.payload;

        state.items = state.items.map((item) => {
          return item.cartitemid === updatedItem.cartitemid
            ? updatedItem
            : item;
        });
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.cartitemid != action.payload,
        );
      });
  },
});

export const { clearCartLocal } = cartSlice.actions;

export default cartSlice.reducer;
