import { combineReducers } from '@reduxjs/toolkit';
import coinsReducer from '../features/coinsSlice';
import preListReducer from '../features/preListSlice';

const rootReducer = combineReducers({
  coins: coinsReducer,
  preList: preListReducer,
});

export default rootReducer;
