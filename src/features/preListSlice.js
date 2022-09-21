import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  preListItems: [],
  loading: false,
  error: null,
};

const preListSlice = createSlice({
  name: 'preList',
  initialState,
  reducers: {
    preListStart: (state) => {
      state.loading = true;
    },
    preListSuccess: (state, action) => {
      state.loading = false;
      state.preListItems.push(action.payload);
    },
    preListFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    removeItemFromPreListStart: (state) => {
      state.loading = true;
    },
    removeItemFromPreListSuccess: (state, action) => {
      state.loading = false;
      state.preListItems = [...action.payload];
    },
    preListReset: (state) => {
      state.loading = false;
      state.preListItems = [];
    },
  },
});

export const {
  preListStart,
  preListSuccess,
  preListFailed,
  removeItemFromPreListStart,
  removeItemFromPreListSuccess,
  preListReset,
} = preListSlice.actions;

export default preListSlice.reducer;
