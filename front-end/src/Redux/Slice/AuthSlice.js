import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "../ThunkFunction/Register";
import { SignIn } from "../ThunkFunction/SignIn";

const initialState = {
  data: null,
  isLoading: false,
  error: null,
  success: false,
  pending: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOutuser: (state) => {
      state.data = null;
      state.isLoading = false;
      state.error = null;
      state.success = true;
      state.pending = false;
    },
    FalsifySuccess: (state) => {
      state.success = false;
    },
    NullifyError: (state) => {
      state.error = null;
    },
    SetError: (state, action) => {
      state.error = action.payload.error;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.pending = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.pending = false;
      state.data = action.payload;
      state.success = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.pending = false;
      state.error = action.payload || "Failed to register your account";
    });

    builder.addCase(SignIn.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(SignIn.fulfilled, (state, action) => {
      state.data = action.payload;
      state.success = true;
    });
    builder.addCase(SignIn.rejected, (state, action) => {
      state.error = action.error instanceof Error ? action.error.message : "User signin failed . . . .!";
    });
  },
});

export const { logOutuser, FalsifySuccess, NullifyError, SetError } = authSlice.actions;
export default authSlice.reducer;
