import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "../features/pegawaiSlice";

export const store = configureStore({
  reducer: {
    users: usersSlice,
  },
});
