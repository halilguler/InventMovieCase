import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { setFilterValue } from "../../features/movies/movieListSlice";

const FilterTable = () => {
  const { filterValue } = useSelector(
    (state) => state.movieList
  );
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(setFilterValue(e.target.value));
  };
  return (
    <div className="d-flex col-3 justify-content-end">
      <TextField
        id="outlined-basic"
        label="Grid Arama"
        value={filterValue || ""}
        defaultValue={""}
        onChange={(e) => {
          handleChange(e);
        }}
      />
    </div>
  );
};

export default FilterTable;
