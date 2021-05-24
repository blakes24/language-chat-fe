import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
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

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

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
