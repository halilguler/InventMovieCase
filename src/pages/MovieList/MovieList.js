import React from 'react'
import FilterTable from '../../components/filter/FilterTable'
import Search from '../../components/search/Search'
import Table from '../../components/table/Table'

const MovieList = () => {
  return (
    <div className='row col-12'>
    <div className='d-flex col-12 align-items-center'>
        <Search />
        <FilterTable/>
    </div>
    <div className='d-flex col-12 justify-content-center flex-column'>
        <Table />
    </div>

</div>
  )
}

export default MovieList