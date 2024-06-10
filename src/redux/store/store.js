import { configureStore } from '@reduxjs/toolkit';
import userLoggedInSlice from '../reducers/userLoginSlice';
import categoriesSlice from '../reducers/categoriesSlice';
import productsSlice from '../reducers/productsSlice';

export const store = configureStore({
  reducer: {
    isUserLoggedIn: userLoggedInSlice,
    categories: categoriesSlice,
    products: productsSlice,
  },
});
