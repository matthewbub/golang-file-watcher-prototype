import React from 'react';
import TableHeadings from './TableHeadings';
import Pagination from './Pagination';
import FilterBar from './FilterBar';
import TableRows from './TableRows';

const Table = () => {
  return (
    <section className='w-full'>
      <FilterBar />
      {/* <TableHeadings /> */}
      <TableRows />
      <Pagination />
    </section>
  )
}

export default Table;