import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts, fetchProductById } from "./thunks";

const initialState = {
  items: [],
  selectedProduct: null,
  status: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,

  reducers: {
    clearSelectedProduct(state) {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch products";
      })

      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch product";
      });
  },
});

export const { clearSelectedProduct } = productsSlice.actions;

export default productsSlice.reducer;
