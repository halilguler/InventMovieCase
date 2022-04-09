import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CircularProgress from "@mui/material/CircularProgress";
import "./style.scss";
import { fetchMovies } from "../../features/movies/movieSlice";
import Pagination from "../pagination/Pagination";

const Table = () => {
  const { movies, loading, filterValue } = useSelector(
    (state) => state.movies
  );


  const [params, setParams] = useState({ pageIndex: 1 });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMovies(params));
  }, []);


  console.log("test", movies.Search);

  return (
    <>
      <div className="d-flex col-12 table-responsive px-4 table-min-height flex-column">
        {loading === "pending" ? (
          <div className="d-flex col-12 justify-content-center">
            <Box
              sx={{
                display: "flex",
                minHeight: "470px",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </Box>
          </div>
        ) : loading === "succeeded" ? (
          <table className="table col-12 p-4">
            <thead className="table-light">
              <tr>
                <th>IMDb ID</th>
                <th>Filmin Adı</th>
                <th>Yayın Tarihi</th>
              </tr>
            </thead>
            <tbody>
              {movies?.Search ? (
                movies?.Search.filter((item) =>
                  item.Title.toLowerCase().includes(filterValue)
                )?.map((item) => (
                  <tr>
                    <td>{item.imdbID}</td>
                    <td>{item.Title}</td>
                    <td>{item.Year}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>{movies.imdbID}</td>
                  <td>{movies.Title}</td>
                  <td>{movies.Year}</td>
                </tr>
              )}
            </tbody>
          </table>
        ) : null}
        <Pagination />
      </div>
    </>
  );
};

export default Table;
