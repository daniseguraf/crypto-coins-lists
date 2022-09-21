import { all } from 'redux-saga/effects';
import { coinsSagas } from '../features/coinsSagas';
import { preListSagas } from '../features/preListSagas';
import { listsSagas } from '../features/listsSagas';

export default function* rootSaga() {
  yield all([...coinsSagas, ...preListSagas, ...listsSagas]);
}
