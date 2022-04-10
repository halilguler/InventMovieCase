import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (params) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=70be74bb&s=${
        params.name ? params.name : "pokemon"
      }&page=${params.pageIndex}`
    );
    return response.data;
  }
);

export const searchType = createAsyncThunk(
  "movies/searchMovies",
  async (params) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=70be74bb&s=${params.name}&type=${params.type}&page=${params.pageIndex}`
    );
    return response.data;
  }
);

export const searchYear = createAsyncThunk(
  "movies/searchYear",
  async (params) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=70be74bb&y=${params.year}&page=${params.pageIndex}`
    );
    return response.data;
  }
);

const initialState = {
  movies: [],
  name: "pokemon",
  type: "",
  loading: "idle",
  filterValue: "",
};

export const movieListSlice = createSlice({
  name: "movieList",
  initialState: initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setFilterValue: (state, action) => {
      state.filterValue = action.payload;
    },
  },

  extraReducers: {
    [fetchMovies.pending]: (state) => {
      state.loading = "pending";
    },
    [fetchMovies.fulfilled]: (state, action) => {
      state.loading = "succeeded";
      state.movies = action.payload;
    },
    [fetchMovies.rejected]: (state) => {
      state.loading = "failed";
    },
    [searchType.pending]: (state) => {
      state.loading = "pending";
    },
    [searchType.fulfilled]: (state, action) => {
      state.loading = "succeeded";
      state.movies = action.payload;
    },
    [searchYear.pending]: (state) => {
      state.loading = "pending";
    },
    [searchYear.fulfilled]: (state, action) => {
      state.loading = "succeeded";
      state.movies = action.payload;
    },
  },
});

export const { setName, setType, setFilterValue } = movieListSlice.actions;

export default movieListSlice.reducer;
