import {
  configureStore,
  getDefaultMiddleware,
  createAction,
} from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import roomReducer from "./roomSlice";
import messageReducer from "./messageSlice";
import partnerReducer from "./partnerSlice";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const reducers = combineReducers({
  users: usersReducer,
  rooms: roomReducer,
  messages: messageReducer,
  partners: partnerReducer,
});

export const logoutUser = createAction("LOGOUT_USER");

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT_USER") {
    return reducers(undefined, action);
  }
  return reducers(state, action);
};

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["users"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export default store;
