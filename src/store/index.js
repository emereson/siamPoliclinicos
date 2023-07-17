import { configureStore } from "@reduxjs/toolkit";
import dataLoginSlice from "./slices/dataLogin";

export default configureStore({
  reducer: {
    dataLoginSlice,
  },
});
