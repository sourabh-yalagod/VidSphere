import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const SignIn = createAsyncThunk(
  "signIn",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/v1/users/login`, formData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "Failed to register your account"
      );
    }
  }
);
