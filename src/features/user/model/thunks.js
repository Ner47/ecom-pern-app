import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApi } from "@/shared/api/userApi";

export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      return await userApi.getProfile();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (payload, { rejectWithValue }) => {
    try {
      return await userApi.updateProfile(payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
