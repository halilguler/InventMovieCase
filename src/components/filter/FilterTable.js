import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilterValue } from "../../features/movies/movieListSlice";

//3rd party package
import TextField from "@mui/material/TextField";

const FilterTable = () => {
  const { filterValue } = useSelector((state) => state.movieList);
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
        onChange={(e) => {
          handleChange(e);
        }}
      />
    </div>
  );
};

export default FilterTable;
