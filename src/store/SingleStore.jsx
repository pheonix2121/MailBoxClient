import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthRedux";

const store = configureStore({
  reducer: {
    auth: authSlice
  },
});

export default store;