import { createAsyncThunk } from "@reduxjs/toolkit";
import { cartApi } from "@/shared/api/cartApi";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      return await cartApi.getCart();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const addCartItem = createAsyncThunk(
  "cart/addCartItem",
  async ({ productId, qty }, { rejectWithValue }) => {
    try {
      return await cartApi.addToCart(productId, qty);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ itemId, qty }, { rejectWithValue }) => {
    try {
      return await cartApi.updateCartItem(itemId, qty);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (itemId, { rejectWithValue }) => {
    try {
      await cartApi.removeCartItem(itemId);
      return itemId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
