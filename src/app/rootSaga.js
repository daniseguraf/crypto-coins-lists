import { all } from 'redux-saga/effects';
import { coinsSagas } from '../features/coinsSagas';
import { favoritesSagas } from '../features/favoritesSagas';

export default function* rootSaga() {
  yield all([...coinsSagas, ...favoritesSagas]);
}
