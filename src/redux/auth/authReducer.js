import { createSlice } from "@reduxjs/toolkit";
import { pendingRejected } from "@utils";
import { userRegister, userLogin, userLogOut, getUser } from "./authOperations";

const { pending, rejected } = pendingRejected;

const initialState = {
  user: {},
  userLang: "en",
  token: "",
  isAuth: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(userRegister.pending, pending);
    builder.addCase(userRegister.rejected, rejected);
    builder.addCase(userRegister.fulfilled, (store, { payload }) => {
      const { token, user } = payload;
      return {
        user,
        token,
        isAuth: true,
        loading: false,
        error: null,
      };
    });

    builder.addCase(userLogin.pending, pending);
    builder.addCase(userLogin.rejected, rejected);
    builder.addCase(userLogin.fulfilled, (store, { payload }) => {
      const { token, user } = payload;
      return {
        user,
        token,
        isAuth: true,
        loading: false,
        error: null,
      };
    });

    builder.addCase(getUser.pending, pending);
    builder.addCase(getUser.rejected, (store, { payload }) => {
      return { ...initialState };
    });
    builder.addCase(getUser.fulfilled, (store, { payload }) => {
      const { token, user } = payload;
      return {
        user,
        token,
        isAuth: true,
        loading: false,
        error: null,
      };
    });

    builder.addCase(userLogOut.pending, pending);
    builder.addCase(userLogOut.rejected, rejected);
    builder.addCase(userLogOut.fulfilled, (store) => ({
      ...initialState,
    }));
  },

  reducers: {
    signUser: (store, { payload }) => {
      return { ...store, ...payload };
    },
    signOut: () => initialState,
  },
});

export const { signUser, signOut } = authSlice.actions;

export default authSlice.reducer;
