import { combineReducers } from '@reduxjs/toolkit';
import coinsReducer from '../features/coinsSlice';
import favoritesReducer from '../features/favoritesSlice';

const rootReducer = combineReducers({
  coins: coinsReducer,
  favorites: favoritesReducer,
});

export default rootReducer;
