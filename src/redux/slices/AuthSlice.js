import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  userDetails: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserAuth: (state, action) => {
      state.userId = action.payload.userId;
      state.userDetails = action.payload.userDetails;
    },
  },
});

export const { updateUserAuth } = authSlice.actions;
export default authSlice.reducer;
