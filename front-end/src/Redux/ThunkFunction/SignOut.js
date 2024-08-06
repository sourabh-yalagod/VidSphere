import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signOutUser = createAsyncThunk("auth/signout", async () => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/users/logout`, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error?.message);
  }
});
