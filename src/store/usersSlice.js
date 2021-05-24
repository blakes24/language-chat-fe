import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ChatApi from "../helpers/api";
import { getFromLocalStorage } from "../helpers/localStorage";

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

export const fetchCurrentUser = createAsyncThunk(
  "users/fetchCurrentUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await ChatApi.getUser(userId);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updateCurrentUser = createAsyncThunk(
  "users/updateCurrentUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await ChatApi.updateUser(data.id, data);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
); 

export const updateSpeaks = createAsyncThunk(
  "users/updateSpeaks",
  async (data, { rejectWithValue }) => {
    try {
      const response = await ChatApi.updateSpeaks(data.id, data);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updateLearning = createAsyncThunk(
  "users/updateLearning",
  async (data, { rejectWithValue }) => {
    try {
      const response = await ChatApi.updateLearning(data.id, data);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await ChatApi.deleteUser(userId);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    items: [],
    current: null,
    token: getFromLocalStorage("token", ""),
    loading: "idle",
    error: null,
  },
  reducers: {
    clearUser: (state, action) => {
      state.current = null;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
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
    [fetchCurrentUser.pending]: (state, action) => {
      if (state.loading === "idle") {
        state.error = null;
        state.loading = "pending";
      }
    },
    [fetchCurrentUser.fulfilled]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.current = action.payload;
      }
    },
    [fetchCurrentUser.rejected]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = action.payload;
      }
    },
    [updateCurrentUser.pending]: (state, action) => {
      if (state.loading === "idle") {
        state.error = null;
        state.loading = "pending";
      }
    },
    [updateCurrentUser.fulfilled]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.current = { ...state.current, ...action.payload };
      }
    },
    [updateCurrentUser.rejected]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = action.payload;
      }
    },
    [updateSpeaks.pending]: (state, action) => {
      if (state.loading === "idle") {
        state.error = null;
        state.loading = "pending";
      }
    },
    [updateSpeaks.fulfilled]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.current.speaks[0] = action.payload;
      }
    },
    [updateSpeaks.rejected]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = action.payload;
      }
    },
    [updateLearning.pending]: (state, action) => {
      if (state.loading === "idle") {
        state.error = null;
        state.loading = "pending";
      }
    },
    [updateLearning.fulfilled]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.current.learning[0] = action.payload;
      }
    },
    [updateLearning.rejected]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = action.payload;
      }
    },
    [deleteUser.pending]: (state, action) => {
      if (state.loading === "idle") {
        state.error = null;
        state.loading = "pending";
      }
    },
    [deleteUser.fulfilled]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.current = null;
        state.token = "";
      }
    },
    [deleteUser.rejected]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = action.payload;
      }
    },
  },
});

export const { clearUser, setToken } = usersSlice.actions;

export default usersSlice.reducer;
