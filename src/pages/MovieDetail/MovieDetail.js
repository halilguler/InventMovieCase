import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";

import { fetchMovieDetail } from "../../features/movies/movieDetailSlice";
import "./style.scss";

const MovieDetail = () => {
  const { id } = useParams();
  const { detail, loading } = useSelector((state) => state.movieDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovieDetail({ id: id }));
  }, []);

  return (
    <>
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
        // <div className="d-flex col-12 justify-content-center align-content-center h-100">
        //   <div className="d-flex col-10 m-4 p-4 detail-shadow border-radius-1">
        //     <div className="d-flex col-8 flex-column">
        //       <div className="d-flex col-12 flex-column justify-content-center">
        //           <span className="d-flex justify-content-center">Başlık</span>
        //           <span className="d-flex justify-content-center">{detail.Title}</span>
        //       </div>
        //       <div className="d-flex">
        //         <span className="col-3">Oyuncular</span>
        //         <span className="col-1">:</span>
        //         <span className="col-4">{detail.Actors}</span>
        //       </div>
        //       <div className="d-flex">
        //         <span className="col-3">IMDB Puanı</span>
        //         <span className="col-1">:</span>
        //         <span className="col-4">{detail.imdbRating}</span>
        //       </div>
        //       <div className="d-flex">
        //         <span className="col-3">Süresi</span>
        //         <span className="col-1">:</span>
        //         <span className="col-4">{detail.Runtime}</span>
        //       </div>
        //       <div className="d-flex">
        //         <span className="col-3">Tür</span>
        //         <span className="col-1">:</span>
        //         <span className="col-4">{detail.Type}</span>
        //       </div>
        //       <div className="d-flex">
        //         <span className="col-3">Türü</span>
        //         <span className="col-1">:</span>
        //         <span className="col-4">{detail.Genre}</span>
        //       </div>
        //     </div>

        //     <div className="d-flex col-4">
        //       <img src={detail.Poster} />
        //     </div>
        //   </div>
        // </div>
      )}
    </>
  );
};

export default MovieDetail;
