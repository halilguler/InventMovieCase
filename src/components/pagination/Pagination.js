import React, { useEffect, useRef, useState } from "react";
import {
  fetchMovies,
  searchType,
  setIsSearch,
  setPaginationStarted,
} from "../../features/movies/movieListSlice";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";

const Pagination = () => {
  const { movies, name, type, paginationStarted, isSearch } = useSelector(
    (state) => state.movieList
  );

  const pagination = useRef();
  const dispatch = useDispatch();

  const setPage = ({ selected }) => {
    if (type === "movie") {
      dispatch(searchType({ name: name, type: type, pageIndex: selected + 1 }));
      pagination.current.setState({ selected });
    } else if (type === "series") {
      dispatch(searchType({ name: name, type: type, pageIndex: selected + 1 }));
      pagination.current.setState({ selected });
    } else if (type === "episode") {
      dispatch(searchType({ name: name, type: type, pageIndex: selected + 1 }));
      pagination.current.setState({ selected });
    } else {
      dispatch(fetchMovies({ name: name, pageIndex: selected + 1 }));
      pagination.current.setState({ selected });
    }
  };

  return (
    <>
      <div className="d-flex col-12 table-responsive px-4 ">
        <ReactPaginate
          ref={pagination}
          pageCount={Math.ceil(movies.totalResults / 10)}
          pageRangeDisplayed={4}
          marginPagesDisplayed={1}
          onPageChange={(selected) => setPage(selected)}
          containerClassName="pagination"
          activeClassName="active"
          pageLinkClassName="page-link"
          breakLinkClassName="page-link"
          nextLinkClassName="page-link"
          previousLinkClassName="page-link"
          pageClassName="page-item"
          breakClassName="page-item"
          nextClassName="page-item"
          previousClassName="page-item"
          previousLabel={<>&laquo;</>}
          nextLabel={<>&raquo;</>}
        />
      </div>
    </>
  );
};

export default Pagination;
