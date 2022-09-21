import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favoritesList: [],
  loading: false,
  error: null,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    favoritesStart: (state) => {
      state.loading = true;
    },
    favoritesSuccess: (state, action) => {
      state.loading = false;
      state.favoritesList.push(action.payload);
    },
    favoritesFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { favoritesStart, favoritesSuccess, favoritesFailed } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
