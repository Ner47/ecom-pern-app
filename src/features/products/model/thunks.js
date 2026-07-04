import { createAsyncThunk } from "@reduxjs/toolkit";
import { productApi } from "@/shared/api/productApi";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params, { rejectWithValue }) => {
    try {
      return await productApi.getProduct(params);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (productId, { rejectWithValue }) => {
    try {
      return await productApi.getProductById(productId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
