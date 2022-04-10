import React, { useState } from "react";

//components

import FilterTable from "../../components/filter/FilterTable";
import Search from "../../components/search/Search";
import Table from "../../components/table/Table";

const MovieList = () => {
  const [pageNumber, setPageNumber] = useState(0);

  const setPageInitial = () => {
    setPageNumber(0);
  };

  return (
    <div className="row col-12">
      <div className="d-flex col-12 align-items-center">
        <Search clearPage={setPageInitial} />
        <FilterTable />
      </div>
      <div className="d-flex col-12 justify-content-center flex-column">
        <Table pageNumber={pageNumber} setPageNumber={setPageNumber} />
      </div>
    </div>
  );
};

export default MovieList;
