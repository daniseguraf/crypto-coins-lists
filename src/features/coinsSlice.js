import { createSlice } from '@reduxjs/toolkit';

const initialState = { coinList: [], loading: false, error: null, page: '' };

const coinsSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {
    getCoinsStart: (state) => {
      state.loading = true;
    },
    getCoinsSuccess: (state, action) => {
      state.loading = false;
      state.coinList = action.payload;
      state.page = action.payload.page;
    },
    getCoinsFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getCoinsStart, getCoinsSuccess, getCoinsFailed } =
  coinsSlice.actions;

export default coinsSlice.reducer;
