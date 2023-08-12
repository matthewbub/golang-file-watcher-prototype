import React from 'react';
import { Input, Select } from '../../../components';

const FilterBar = () => {
  return (
    <section className='w-full container-padding grid grid-cols-12 gap-2 bg2'>
      <div className='col-span-12'>
        <Input label='Search documents' placeholder='Search' />
      </div>
      <div className='col-span-3'>
        <Select
          label='Filter by category'
          register={() => ({
            onChange: () => { },
            onBlur: () => { },
            ref: () => { },
          })}
          options={[
            { id: 'all', name: 'All' },
            { id: 'document', name: 'Document' },
            { id: 'client', name: 'Client' },
            { id: 'date', name: 'Date' },
          ]}
        />
      </div>
      <div className='col-span-3'>
        <Select
          label='Filter by date'
          register={() => ({
            onChange: () => { },
            onBlur: () => { },
            ref: () => { },
          })}
          options={[
            { id: 'ascending', name: 'Default (ascending)' },
            { id: 'descending', name: 'Descending' },
          ]}
        />
      </div>
    </section>
  )
}

export default FilterBar;