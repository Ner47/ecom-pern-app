import { createAsyncThunk } from "@reduxjs/toolkit";
import { orderApi } from "@/shared/api/orderApi";

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      return await orderApi.getOrders();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchOrdersById = createAsyncThunk(
  "orders/fetchOrdersById",
  async (orderId, { rejectWithValue }) => {
    try {
      return await orderApi.getOrderById(orderId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (cartId, paymentInfo, { rejectWithValue }) => {
    try {
      return await orderApi.createOrder(cartId, paymentInfo);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
