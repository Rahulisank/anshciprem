import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openLoginModal: false,
  openSignUpModal: false,
  openSignUpCredentialsModal: false,
  openCreatePostModal: false,
  openCreateGroupModal: false,
  openChatBoxModal: false,
};

const modalSlice = createSlice({
  name: "authslice",
  initialState,
  reducers: {
    updateModalState: (state, action) => {
      // Reset all modal states to false
      Object.keys(state).forEach((key) => {
        state[key] = false;
      });

      // Activate the specified modal
      if (state.hasOwnProperty(action.payload)) {
        state[action.payload] = true;
      }
    },
    closeModal: (state, action) => {
      // Close the specified modal
      if (state.hasOwnProperty(action.payload)) {
        state[action.payload] = false;
      }
    },
  },
});

export const { updateModalState, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
