import { createSlice } from "@reduxjs/toolkit";
import { fetchUserProfile, updateUserProfile } from "./thunks";

const initialState = {
  profile: null,
  status: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "user",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch user profile";
      })

      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      });
  },
});

export default productsSlice.reducer;
