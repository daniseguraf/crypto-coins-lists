import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

let sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const listItemsFromStorage = localStorage.getItem('listItems')
  ? JSON.parse(window.atob(localStorage.getItem('listItems')))
  : [];

const preloadedState = {
  lists: {
    listItems: listItemsFromStorage,
  },
};
const store = configureStore({
  reducer: rootReducer,
  middleware,
  preloadedState,
});

sagaMiddleware.run(rootSaga);

export default store;
