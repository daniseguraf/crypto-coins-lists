import { takeEvery, put, fork, call } from 'redux-saga/effects';

import {
  createListStart,
  createListSuccess,
  createListFailed,
} from './listsSlice';

// Worker sagas
function* preListStartWorker(action) {
  const { id } = action.payload;

  try {
    const response = yield call(getCoinApi, id);

    if (response.status === 200) {
      const { id, symbol, name, image } = response.data;

      yield put(
        preListSuccess({
          id,
          symbol,
          name,
          image,
        })
      );
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
