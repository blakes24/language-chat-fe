import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import roomReducer from "./roomSlice";

export default configureStore({
  reducer: {
    users: usersReducer,
    rooms: roomReducer,
  },
});
