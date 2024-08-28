import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ user, navigate }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/api/auth/login",
        withCredentials: true,
        data: {
          email: user.email,
          password: user.password,
        },
      });
      window.location = "/";
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ user, navigate }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/api/auth/register",
        withCredentials: true,
        data: {
          name: user.name,
          email: user.email,
          password: user.password,
        },
      });
      navigate("/login");
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const activateEmail = createAsyncThunk(
  "auth/activateEmail",
  async (activationToken, { rejectWithValue }) => {
    try {
      const res = await axios({
        method: "post",
        url: "http://localhost:5000/api/auth/activation",
        withCredentials: true,
        data: {
          activationToken,
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const getToken = createAsyncThunk("auth/getToken", async () => {
  try {
    const res = await axios({
      method: "get",
      url: "http://localhost:5000/api/auth/refreshtoken",
      withCredentials: true,
    });
    return res.data.accessToken;
  } catch (err) {
    console.log(err.response.data.message);
  }
});

export const logOut = createAsyncThunk("auth/logOut", async (req, res) => {
  try {
    await axios({
      method: "get",
      url: "http://localhost:5000/api/auth/logout",
      withCredentials: true,
    });
    window.location = "/";
  } catch (err) {
    console.log(err);
    window.location = "/";
  }
});

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/api/auth/forgot",
        withCredentials: true,
        data: {
          email,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ password, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/reset",
        { password },
        { headers: { Authorization: token } }
      );
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    success: false,
    error: false,
    token: null,
  },
  reducers: {
    reset: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = false;
    },
  },
  extraReducers: {
    [loginUser.pending]: (state, { payload }) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = payload;
      state.error = false;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    },
    [registerUser.pending]: (state, { payload }) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = payload;
      state.error = false;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    },
    [activateEmail.pending]: (state, { payload }) => {
      state.success = false;
      state.error = false;
    },
    [activateEmail.fulfilled]: (state, { payload }) => {
      state.success = payload;
      state.error = false;
    },
    [activateEmail.rejected]: (state, { payload }) => {
      state.success = false;
      state.error = payload;
    },
    [getToken.pending]: (state, { payload }) => {
      state.token = null;
    },
    [getToken.fulfilled]: (state, { payload }) => {
      state.token = payload;
    },
    [getToken.rejected]: (state, { payload }) => {
      state.token = null;
    },
    [forgotPassword.pending]: (state, { payload }) => {
      state.success = false;
      state.error = false;
    },
    [forgotPassword.fulfilled]: (state, { payload }) => {
      state.success = payload;
      state.error = false;
    },
    [forgotPassword.rejected]: (state, { payload }) => {
      state.success = false;
      state.error = payload;
    },
    [resetPassword.pending]: (state, { payload }) => {
      state.success = false;
      state.error = false;
    },
    [resetPassword.fulfilled]: (state, { payload }) => {
      state.success = payload;
      state.error = false;
    },
    [resetPassword.rejected]: (state, { payload }) => {
      state.success = false;
      state.error = payload;
    },
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
