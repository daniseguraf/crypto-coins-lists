import { takeEvery, put, fork, select } from 'redux-saga/effects';
import { v4 as uuidv4 } from 'uuid';
import {
  createListStart,
  createListSuccess,
  createListFailed,
  deleteListStart,
  deleteListSuccess,
} from './listsSlice';

import { preListReset } from '../features/preListSlice';

// Worker sagas
function* createListStartWorker(action) {
  const { name, list } = action.payload;

  if (name && list.length) {
    yield put(
      createListSuccess({
        id: uuidv4(),
        name,
        list,
      })
    );

    const { listItems } = yield select((state) => state.lists);

    yield localStorage.setItem(
      'listItems',
      window.btoa(JSON.stringify(listItems))
    );
    yield put(preListReset());
  } else {
    yield put(createListFailed('Error'));
  }
}

function* deleteListStarttWorker(action) {
  const { id } = action.payload;
  const { listItems } = yield select((state) => state.lists);

  const updatedList = yield listItems.filter((el) => el.id !== id);

  yield put(deleteListSuccess(updatedList));
  yield localStorage.setItem(
    'listItems',
    window.btoa(JSON.stringify(updatedList))
  );
}

// Watcher sagas
function* createListWatcher() {
  yield takeEvery(createListStart.type, createListStartWorker);
}

function* deleteListWatcher() {
  yield takeEvery(deleteListStart.type, deleteListStarttWorker);
}

export const listsSagas = [fork(createListWatcher), fork(deleteListWatcher)];
