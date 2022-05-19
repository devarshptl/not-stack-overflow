import {createSlice} from "@reduxjs/toolkit";

const rootState = {
  uid: null,
  uname: null,
  email: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: rootState,
  reducers: {
    removeUser: (state) => {
      return rootState;
    },
    updateUser: (state, {payload}) => {
      return {...state, ...payload};
    },
  },
});

export const {updateUser, removeUser} = userSlice.actions;

export default userSlice.reducer;
