import React from 'react'
import FilterTable from '../filter/FilterTable'
import Search from '../search/Search'
import Table from '../table/Table'

const Layout = () => {

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

export default Layout