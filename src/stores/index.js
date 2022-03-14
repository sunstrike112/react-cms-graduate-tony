import { configureStore } from "@reduxjs/toolkit";

// slice
import appSlice from 'state/app/appSlice';

export const store = configureStore({
  reducer: {
    app: appSlice
  }
})