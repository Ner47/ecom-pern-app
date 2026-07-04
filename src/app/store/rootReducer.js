import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "@/features/auth/model/slice";
import productsReducer from "@/features/products/model/slice";

export const rootReducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
});
