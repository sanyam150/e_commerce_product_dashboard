import { createSlice } from '@reduxjs/toolkit';

const userLoggedInSlice = createSlice({
  name: 'userLoggedInInfo',
  initialState: {
    userInfo: null,
  },
  reducers: {
    login: (state, action) => {
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.userInfo = null;
    },
  },
});

export const { login, logout } = userLoggedInSlice.actions;
export default userLoggedInSlice.reducer;
