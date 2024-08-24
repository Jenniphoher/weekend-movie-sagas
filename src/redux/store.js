import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';



// ================= REDUCERS:
// ------------ SET_MOVIES:
const movies = (state = [], action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return action.payload;
    default:
      return state;
  }
}

// ------------ SET_GENRES:
const genres = (state = [], action) => {
  switch (action.type) {
    case 'SET_GENRES':
      return action.payload;
    default:
      return state;
  }
}


// ================= GENERATOR FUNCTIONS:
// ------------ GET movies:
function* fetchAllMovies() {
  try {
    const moviesResponse = yield axios.get('/api/movies');
    console.log('Saga GET movies:', moviesResponse.data);
    yield put({
      type: 'SET_MOVIES',
      payload: moviesResponse.data
    });
  } catch (error) {
    console.log('fetchAllMovies error:', error);
  }
}

// ------------ GET movies:



// ================= RootSaga generator function:
function* rootSaga() {
  yield takeEvery('FETCH_MOVIES', fetchAllMovies);
}



// ================= CREATE sagaMiddleware:
const sagaMiddleware = createSagaMiddleware();



// ================= STORE:
const storeInstance = createStore(
  combineReducers({
    movies,
    genres,
  }),
  applyMiddleware(sagaMiddleware, logger),
);



// ================= RUN rootSaga:
sagaMiddleware.run(rootSaga);

export default storeInstance;
