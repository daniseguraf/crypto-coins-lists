import { takeEvery, put, fork, call } from 'redux-saga/effects';
import { getCoinApi } from '../app/api';
import {
  preListStart,
  preListSuccess,
  preListFailed,
  removeItemFromPreListStart,
  removeItemFromPreListSuccess,
} from './preListSlice';

// Worker sagas
function* preListStartWorker(action) {
  const { id } = action.payload;

  try {
    const response = yield call(getCoinApi, id);

    if (response.status === 200) {
      yield put(preListSuccess(response.data));
    }
  } catch (error) {
    yield put(
      preListFailed(
        error?.response?.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
}

function* removeItemFromPreListStarttWorker(action) {
  const { preListItems, id } = action.payload;
  const updatedList = yield preListItems.filter((el) => el.id !== id);

  yield put(removeItemFromPreListSuccess(updatedList));
}

// Watcher sagas
function* preListWatcher() {
  yield takeEvery(preListStart.type, preListStartWorker);
}

function* removeItemFromPreListWatcher() {
  yield takeEvery(
    removeItemFromPreListStart.type,
    removeItemFromPreListStarttWorker
  );
}

export const preListSagas = [
  fork(preListWatcher),
  fork(removeItemFromPreListWatcher),
];
