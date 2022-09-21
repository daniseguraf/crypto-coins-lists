import { all } from 'redux-saga/effects';
import { coinsSagas } from '../features/coinsSagas';
import { preListSagas } from '../features/preListSagas';

export default function* rootSaga() {
  yield all([...coinsSagas, ...preListSagas]);
}
