import usersReducer from "./usersSlice";
import roomReducer from "./roomSlice";
import messageReducer from "./messageSlice";
import partnerReducer from "./partnerSlice";
import { combineReducers } from "redux";

const reducers = combineReducers({
  users: usersReducer,
  rooms: roomReducer,
  messages: messageReducer,
  partners: partnerReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT_USER") {
    return reducers(undefined, action);
  }
  return reducers(state, action);
};

export default rootReducer;
