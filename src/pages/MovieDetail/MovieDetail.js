import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

//Redux

import { fetchMovieDetail } from "../../features/movies/movieDetailSlice";

//3rd party package
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";

// style
import "./style.scss";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { detail, loading } = useSelector((state) => state.movieDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovieDetail({ id: id }));
  }, []);

  return (
    <>
      <div>
        <button className="btn btn-secondary ms-3 mt-3"
          onClick={() => {
            navigate(-1);
          }}
        >
          Geri
        </button>
      </div>
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
      ) : (
        <div className="movie_card" id="bright">
          <div className="info_section">
            <div className="movie_header">
              <img className="locandina" src={detail.Poster} />
              <h1>{detail.Title}</h1>
              <h4>
                {detail.Year},{" "}
                {detail.Director === "N/A" ? "Not available" : detail.Director}
              </h4>
              <span className="minutes">{detail.Runtime}</span>
              <p className="type">{detail.Genre}</p>
            </div>
            <div className="movie_desc mt-4">
              <p className="text">{detail.Plot}</p>
            </div>
          </div>
          <div
            style={{ background: `url(${detail.Poster})` }}
            className="blur_back bright_back"
          ></div>
        </div>
      )}
    </>
  );
};

export default MovieDetail;
