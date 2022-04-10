import { configureStore } from '@reduxjs/toolkit';
import movieDetailReducer from '../features/movies/movieDetailSlice';
import movieListReducer from '../features/movies/movieListSlice';

export const store = configureStore({
  reducer: {
    movieList: movieListReducer,
    movieDetail:movieDetailReducer
  },
});
