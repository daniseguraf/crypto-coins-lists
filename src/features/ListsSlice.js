import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  listItems: [],
  loading: false,
  error: null,
};

const listsSlice = createSlice({
  name: 'Lists',
  initialState,
  reducers: {
    createListStart: (state) => {
      state.loading = true;
    },
    createListSuccess: (state, action) => {
      state.loading = false;
      state.listItems.push(action.payload);
    },
    createListFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteListStart: (state) => {
      state.loading = true;
    },
    deleteListSuccess: (state, action) => {
      state.loading = false;
      state.listItems = [...action.payload];
    },
  },
});

export const {
  createListStart,
  createListSuccess,
  createListFailed,
  deleteListStart,
  deleteListSuccess,
} = listsSlice.actions;

export default listsSlice.reducer;
