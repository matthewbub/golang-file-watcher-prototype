import React from 'react';
import Pagination from './Pagination';
import FilterBar from './FilterBar';
import TableRows from './TableRows';

const Table = () => {
  return (
    <section className='w-full'>
      <FilterBar />
      <TableRows />
      <Pagination />
    </section>
  )
}

export default Table;