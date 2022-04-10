import React, { useRef } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, searchType } from "../../features/movies/movieListSlice";

//3rd part package
import ReactPaginate from "react-paginate";
import { movieFilterOptionEnum } from "../../enums/MovieFilterOptionEnum";

const Pagination = ({ pageNumber, setPageNumber }) => {
  const { movies, name, type } = useSelector((state) => state.movieList);

  const pagination = useRef();
  const dispatch = useDispatch();

  const setPage = ({ selected }) => {
    if (type === movieFilterOptionEnum.JUST_MOVIE) {
      dispatch(searchType({ name: name, type: type, pageIndex: selected + 1 }));
      pagination.current.setState({ selected });
    } else if (type === movieFilterOptionEnum.JUST_SERIES) {
      dispatch(searchType({ name: name, type: type, pageIndex: selected + 1 }));
      pagination.current.setState({ selected });
    } else if (type === movieFilterOptionEnum.JUST_SERIES_SEASON) {
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
          forcePage={pageNumber}
          pageRangeDisplayed={4}
          marginPagesDisplayed={1}
          onPageChange={(selected) => {
            setPageNumber(selected.selected);
            setPage(selected);
          }}
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
