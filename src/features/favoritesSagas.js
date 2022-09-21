import { takeEvery, put, delay, fork, call } from 'redux-saga/effects';
import { getCoinApi } from '../app/api';
import {
  favoritesStart,
  favoritesSuccess,
  favoritesFailed,
} from './favoritesSlice';

// Worker sagas
function* favoritesStartWorker(action) {
  const { id } = action.payload;

  try {
    const response = yield call(getCoinApi, id);

    if (response.status === 200) {
      const { id, symbol, name, image } = response.data;

      yield put(
        favoritesSuccess({
          id,
          symbol,
          name,
          image,
        })
      );
    }
  } catch (error) {
    yield put(
      favoritesFailed(
        error?.response?.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
}

// Watcher sagas
function* favoritesWatcher() {
  yield takeEvery(favoritesStart.type, favoritesStartWorker);
}

export const favoritesSagas = [fork(favoritesWatcher)];
