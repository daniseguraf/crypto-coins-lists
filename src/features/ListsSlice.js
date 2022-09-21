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
    createList: (state, action) => {
      state.listItems.push(action.payload);
    },
  },
});

export const { createList } = listsSlice.actions;

export default listsSlice.reducer;
