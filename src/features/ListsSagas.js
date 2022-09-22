import { takeEvery, put, fork, select } from 'redux-saga/effects';
import { v4 as uuidv4 } from 'uuid';
import {
  createListStart,
  createListSuccess,
  deleteListStart,
  createListFailed,
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
  // const { preListItems, id } = action.payload;
  // const updatedList = yield preListItems.filter((el) => el.id !== id);
  // yield put(removeItemFromPreListSuccess(updatedList));
}

// Watcher sagas
function* createListWatcher() {
  yield takeEvery(createListStart.type, createListStartWorker);
}

function* deleteListWatcher() {
  yield takeEvery(deleteListStart.type, deleteListStarttWorker);
}

export const listsSagas = [fork(createListWatcher), fork(deleteListWatcher)];
