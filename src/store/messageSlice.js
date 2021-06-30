import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ChatApi from "../helpers/api";
import { logoutUser } from "./logout";

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (roomId, { rejectWithValue, dispatch }) => {
    try {
      const response = await ChatApi.getMessages(roomId);
      return response;
    } catch (err) {
      if (err?.[0] === "Invalid token") {
        dispatch(logoutUser());
      } else {
        return rejectWithValue(err);
      }
    }
  }
);

export const messageSlice = createSlice({
  name: "messages",
  initialState: { items: [], loading: "idle", error: null },
  reducers: {
    addMessage(state, action) {
      state.items.push(action.payload);
    },
  },
  extraReducers: {
    [fetchMessages.pending]: (state, action) => {
      if (state.loading === "idle") {
        state.error = null;
        state.loading = "pending";
      }
    },
    [fetchMessages.fulfilled]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.items = action.payload;
      }
    },
    [fetchMessages.rejected]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.items = [];
        state.error = action.payload;
      }
    },
  },
});

export const { addMessage } = messageSlice.actions;

export default messageSlice.reducer;
