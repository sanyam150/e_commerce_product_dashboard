import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProductsByPage = createAsyncThunk(
  'products/fetchProductsByPage',
  async (limit) => {
    const response = await fetch(
      `https://fakestoreapi.com/products?limit=${limit}`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return { data };
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    currentPage: 1,
    totalProducts: 5,
    status: 'idle',
    error: null,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
      state.totalProducts = state.currentPage * 5;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByPage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByPage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.data;
      })
      .addCase(fetchProductsByPage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setCurrentPage } = productsSlice.actions;

export default productsSlice.reducer;
