import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  uid: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLoginDetails: (state, action) => {
      state.token = action.payload.token;
      state.uid = action.payload.uid;
    },
    setSignOut: (state) => {
      state.token = null;
      state.uid = null;
    },
  },
});

export const { setUserLoginDetails, setSignOut } = userSlice.actions;

export const selectUserToken = (state) => state.user.token;

export const selectUid = (state) => state.user.uid;
export default userSlice.reducer;
