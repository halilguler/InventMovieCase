import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CircularProgress from "@mui/material/CircularProgress";
import "./style.scss";
import { fetchMovies } from "../../features/movies/movieListSlice";
import Pagination from "../pagination/Pagination";
import { Link } from "react-router-dom";

const Table = () => {
  const { movies, loading, filterValue } = useSelector(
    (state) => state.movieList
  );

  const [params, setParams] = useState({ pageIndex: 1 });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMovies(params));
  }, []);

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
          <div>
            <table className="table col-12 table-bordered">
              <thead className="table-light">
                <tr>
                  <th scope="col">IMDb ID</th>
                  <th scope="col">Filmin Adı</th>
                  <th scope="col">Yayın Tarihi</th>
                </tr>
              </thead>
              <tbody>
                {movies?.Search ? (
                  movies?.Search.filter((item) =>
                    item.Title.toLowerCase().includes(filterValue)
                  )?.map((item, i) => (
                    <tr key={i}>
                      <td>{item.imdbID}</td>
                      <td style={{ cursor: "pointer" }}>
                        <Link to={`moviedetail/${item.imdbID}`}>
                          {item.Title}
                        </Link>
                      </td>
                      <td>{item.Year}</td>
                    </tr>
                  ))
                ) : (
                  <tr key={movies.imdbID}>
                    <td>{movies.imdbID}</td>
                    <td>{movies.Title}</td>
                    <td>{movies.Year}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : null}
        <div className="d-flex position-absolute bottom-0">
          <Pagination />
        </div>
      </div>
    </>
  );
};

export default Table;
