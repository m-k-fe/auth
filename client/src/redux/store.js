import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import userSlice from "./features/userSlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
  },
});
export default store;
