import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ChatApi from "../helpers/api";

// data = { userId, partnerId }
export const fetchRooms = createAsyncThunk(
  "rooms/fetchRooms",
  async (data, { rejectWithValue }) => {
    try {
      const response = await ChatApi.getRooms(data);
      return response.rooms;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const roomSlice = createSlice({
  name: "rooms",
  initialState: { items: [], current: null, loading: "idle", error: null },
  reducers: {
    setCurrentRoom(state, action) {
      state.current = action.payload;
    },
    addRoom(state, action) {
      state.items.push(action.payload);
    },
  },
  extraReducers: {
    [fetchRooms.pending]: (state, action) => {
      if (state.loading === "idle") {
        state.error = null;
        state.loading = "pending";
      }
    },
    [fetchRooms.fulfilled]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.items = action.payload;
      }
    },
    [fetchRooms.rejected]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.items = [];
        state.error = action.payload;
      }
    },
  },
});

export const { setCurrentRoom, addRoom } = roomSlice.actions;

export default roomSlice.reducer;
