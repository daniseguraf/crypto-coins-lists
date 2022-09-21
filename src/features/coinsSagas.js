import { takeEvery, put, delay, fork, call } from 'redux-saga/effects';
import { getCoinsApi } from '../app/api';
import { getCoinsStart, getCoinsSuccess, getCoinsFailed } from './coinsSlice';

// Worker sagas
function* getCoinsStartWorker(action) {
  const { pageNumber, navigate } = action.payload;

  try {
    const response = yield call(getCoinsApi, +pageNumber);

    if (response.status === 200) {
      yield delay(250);
      yield put(getCoinsSuccess(response.data));

      if (navigate) {
        navigate(`/page/${pageNumber}`);
      }
    }
  } catch (error) {
    yield put(
      getCoinsFailed(
        error?.response?.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
}

// Watcher sagas
function* getCoinsWatcher() {
  yield takeEvery(getCoinsStart.type, getCoinsStartWorker);
}

export const coinsSagas = [fork(getCoinsWatcher)];
