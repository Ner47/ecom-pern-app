import { createSlice } from "@reduxjs/toolkit";
import { fetchOrders, fetchOrdersById, createOrder } from "./thunks";

const initialState = {
  items: [],
  selectedOrder: null,
  status: "idle",
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,

  reducers: {
    clearSelectedOrder(state) {
      state.selectedOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch orders";
      })

      .addCase(fetchOrdersById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchOrdersById.fulfilled, (state, action) => {
        state.selectedOrder = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchOrdersById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch order";
      })

      .addCase(createOrder.fulfilled, (state, action) => {
        const order = action.payload;
        state.items.unshift(order);
        state.selectedOrder = order;
      });
  },
});

export const { clearSelectedOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
