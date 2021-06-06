import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ChatApi from "../helpers/api";

export const fetchPartners = createAsyncThunk(
  "partners/fetchPartners",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await ChatApi.getPartners(userId);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deletePartner = createAsyncThunk(
  "partners/deletePartner",
  async (data, { rejectWithValue }) => {
    try {
      await ChatApi.deletePartner(data);
      return data.partnerId;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const partnerSlice = createSlice({
  name: "partners",
  initialState: { items: [], loading: "idle", error: null },
  reducers: {},
  extraReducers: {
    [fetchPartners.pending]: (state, action) => {
      if (state.loading === "idle") {
        state.error = null;
        state.loading = "pending";
      }
    },
    [fetchPartners.fulfilled]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.items = action.payload;
      }
    },
    [fetchPartners.rejected]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = action.payload;
      }
    },
    [deletePartner.pending]: (state, action) => {
      if (state.loading === "idle") {
        state.error = null;
        state.loading = "pending";
      }
    },
    [deletePartner.fulfilled]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },
    [deletePartner.rejected]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = action.payload;
      }
    },
  },
});

export default partnerSlice.reducer;
