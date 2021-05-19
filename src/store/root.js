import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import roomReducer from "./roomSlice";
import messageReducer from "./messageSlice";

export default configureStore({
  reducer: {
    users: usersReducer,
    rooms: roomReducer,
    messages: messageReducer,
  },
});
