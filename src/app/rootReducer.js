import { combineReducers } from '@reduxjs/toolkit';
import coinsReducer from '../features/coinsSlice';
import preListReducer from '../features/preListSlice';
import listsReducer from '../features/listsSlice';

const rootReducer = combineReducers({
  coins: coinsReducer,
  preList: preListReducer,
  lists: listsReducer,
});

export default rootReducer;
