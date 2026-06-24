import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "@/shared/api/authApi";
import { storage } from "@/shared/lib/storage";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await authApi.login(credentials);

      if (data.accessToken) {
        storage.setToken(data.accessToken);
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
