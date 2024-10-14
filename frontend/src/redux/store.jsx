import { configureStore } from "@reduxjs/toolkit";
import cartItemsLengthReducer from "./slices/cartItemsLength";

export const store = configureStore({
  reducer: {
    cartItemsLength: cartItemsLengthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
