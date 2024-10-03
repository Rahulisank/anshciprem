import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  myGroups: [],
  joinedGroups: [],
  allGroups: [],
};

const groupSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateMyGroupsState: (state, action) => {
      state.myGroups = action.payload;
    },

    updateJoinedGroupsState: (state, action) => {
      state.joinedGroups = action.payload;
    },

    updateGroupsState: (state, action) => {
      state.allGroups = action.payload;
    },
  },
});

export const {
  updateMyGroupsState,
  updateJoinedGroupsState,
  updateGroupsState,
} = groupSlice.actions;
export default groupSlice.reducer;
