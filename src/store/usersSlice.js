import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ChatApi from "../helpers/api";

export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async (filter, { rejectWithValue }) => {
    try {
      const response = await ChatApi.getAllUsers(filter);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState: { items: [], loading: "idle", error: null },
  reducers: {},
  extraReducers: {
    [fetchAllUsers.pending]: (state, action) => {
      if (state.loading === "idle") {
        state.error = null;
        state.loading = "pending";
      }
    },
    [fetchAllUsers.fulfilled]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.items = action.payload;
      }
    },
    [fetchAllUsers.rejected]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.items = [];
        state.error = action.payload;
      }
    },
  },
});

export default usersSlice.reducer;
