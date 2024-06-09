import { configureStore } from '@reduxjs/toolkit';
import userLoggedInSlice from '../reducers/userLoginSlice';

export const store = configureStore({
  reducer: {
    isUserLoggedIn: userLoggedInSlice,
  },
});
