import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put, takeLatest } from 'redux-saga/effects';
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
    // console.log('Saga GET movies:', moviesResponse.data);
    yield put({
      type: 'SET_MOVIES',
      payload: moviesResponse.data
    });
  } catch (error) {
    console.log('fetchAllMovies error:', error);
  }
}




// ------------ GET movie detail:
function* fetchMovieDetail(action) {
  // console.log('SAGA movie detail payload:', action.payload);
  try {
    const movieIdResponse = yield axios.get(`/api/movies/${action.payload}`);
    console.log('Saga GET movie detail:', movieIdResponse.data);

    yield put({
      type: 'SET_MOVIES',
      payload: movieIdResponse.data
    })
  } catch (error) {
    console.log('Saga GET movie detail ERROR:', error);
  }

}




// ================= RootSaga generator function:
function* rootSaga() {
  yield takeEvery('FETCH_MOVIES', fetchAllMovies);
  yield takeLatest('FETCH_DETAIL', fetchMovieDetail)
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
