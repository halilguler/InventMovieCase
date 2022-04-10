import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const defaultHeaders = {
  "Content-Type": "application/json",
};

export const fetchMovieDetail = createAsyncThunk(
  "movies/fetchMovieDetail",
  async (params, { dispatch, rejectWithValue }) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=70be74bb&i=${params.id}&plot=full`,
      { headers: { ...defaultHeaders } }
    );
    return response.data;
  }
);

const initialState = {
  detail: [],
  loading: "idle",
};

export const movieDetail = createSlice({
  name: "movies",
  initialState: initialState,
  reducers: {},

  extraReducers: {
    [fetchMovieDetail.pending]: (state) => {
      state.loading = "pending";
    },
    [fetchMovieDetail.fulfilled]: (state, action) => {
      state.loading = "succeeded";
      state.detail = action.payload;
    },
    [fetchMovieDetail.rejected]: (state) => {
      state.loading = "failed";
    },
  },
});

export const {} = movieDetail.actions;

export default movieDetail.reducer;
