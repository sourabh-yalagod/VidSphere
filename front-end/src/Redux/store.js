import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "@/Redux/Slice/AuthSlice"; // Adjust the path as necessary
import userReducer from "@/Redux/Slice/UserSlice"; // Adjust the path as necessary
const store = configureStore({
  reducer: {
    auth: registerReducer,
    user: userReducer,
  },
});

export default store;
