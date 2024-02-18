import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "@api";
import { makeAlert } from "@utils";

const prepareError = (error, withAlert=true) => {
  const { message } = error.response.data;
  withAlert && makeAlert(message);
  return message;
};

export const userRegister = createAsyncThunk("auth/register", async (data, { rejectWithValue }) => {
  try {
    return await auth.register(data);
  } catch (error) {
    return rejectWithValue(prepareError(error));
  }
});

export const userLogin = createAsyncThunk("auth/login", async (data, { rejectWithValue }) => {
  try {
    return await auth.login(data);
  } catch (error) {
    return rejectWithValue(prepareError(error));
  }
});

export const userLogOut = createAsyncThunk("auth/logOut", async (_, { rejectWithValue }) => {
  try {
    await auth.logout();
    return;
  } catch (error) {
    return rejectWithValue(prepareError(error));
  }
});

export const getUser = createAsyncThunk(
  "auth/current",
  async (_, { rejectWithValue, getState }) => {
    try {
      const store = getState();
      const { token } = store.auth;
      return await auth.getCurrent(token);
    } catch (error) {
      return rejectWithValue(prepareError(error, false));
    }
  },
  {
    condition: (_, { getState }) => {
      const { auth } = getState();
      if (!auth.token) {
        return false;
      }
    },
  }
);
