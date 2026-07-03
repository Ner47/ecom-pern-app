import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "@/features/auth/model/slice";

export const rootReducer = combineReducers({
  auth: authReducer,
});
