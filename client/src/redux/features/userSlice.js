import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUser = createAsyncThunk("user/getUser", async (token) => {
  try {
    const res = await axios.get("http://localhost:5000/api/users/info", {
      headers: { Authorization: token },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
});

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ name, avatar, token }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        "http://localhost:5000/api/users/update",
        { name, avatar },
        { headers: { Authorization: token } }
      );
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (token) => {
    const response = await axios.get(
      "http://localhost:5000/api/users/all-info",
      { headers: { Authorization: token } }
    );
    return response.data;
  }
);

export const editRole = createAsyncThunk(
  "user/editRole",
  async ({ role, token, id }, { rejectWithValue }) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/users/update-role/${id}`,
        { role },
        { headers: { Authorization: token } }
      );
      return { role, id };
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/delete/${id}`, {
        headers: { Authorization: token },
      });
      return { id };
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    users: [],
  },
  reducers: {},
  extraReducers: {
    [getUser.pending]: (state, { payload }) => {
      state.user = null;
    },
    [getUser.fulfilled]: (state, { payload }) => {
      state.user = payload;
    },
    [getUser.rejected]: (state, { payload }) => {
      state.user = null;
    },
    [getAllUsers.fulfilled]: (state, { payload }) => {
      state.users = payload;
    },
    [editRole.fulfilled]: (state, { payload }) => {
      state.users = state.users.map((item) => {
        if (item._id === payload.id) return { ...item, role: payload.role };
        return item;
      });
    },
    [deleteUser.fulfilled]: (state, { payload }) => {
      state.users = state.users.filter((item) => item._id != payload.id);
    },
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
