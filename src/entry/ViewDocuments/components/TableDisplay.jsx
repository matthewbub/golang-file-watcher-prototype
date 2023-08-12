import React, { useState } from 'react';
import clsx from 'clsx';
import TableRowEditableFields from './TableRowEditableFields';
import { tableConfig } from '../constants';
import TableHeadings from './TableHeadings';
import Pagination from './Pagination';
import { Input, Select } from '../../../components';

const TableDisplay = () => {
  return (
    <section className='w-full'>
      <div className='w-full container-padding grid grid-cols-12 gap-2 bg2'>
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
      </div>
      <TableHeadings />
      <div className='iep--table w-full min-h-[384px]'>
        {Object.keys(tableConfig.data).length === 0 && (
          <div className='iep--table-row w-full h-96 flex items-center justify-center'>
            <p className='txt2'>No documents</p>
          </div>
        )}
        {Object.keys(tableConfig.data).map((item, index) => {
          const [open, setOpen] = useState(false);
          return (
            <div key={index} className={clsx(
              open ? 'border border-dashed border-teal-500' : 'border border-transparent',
              'focus-within:border focus-within:border-teal-500',
            )}>
              <div className={clsx(
                'iep--table-row grid grid-cols-12 gap-2 hover:bg3',
                index % 2 === 0 ? '' : 'bg2',
              )}>
                <div className={'container-padding-left flex items-center h-16 text-sm col-span-10 sm:col-span-7'}>
                  <span className='txt1 text-sm'>
                    {tableConfig.data[item][1]}
                  </span>
                </div>
                <div className={'items-center h-16 text-sm sm:flex hidden col-span-2'}>
                  <span className='txt1 text-sm sm:flex hidden col-span-2'>
                    {tableConfig.data[item][2]}
                  </span>
                </div>
                <div className={'items-center h-16 text-sm sm:flex hidden col-span-2'}>
                  <span className='txt1 text-sm sm:flex hidden col-span-2'>
                    {tableConfig.data[item][3]}
                  </span>
                </div>
                <div className={'flex items-center h-16 text-sm'}>
                  <button
                    className={clsx('a1', open && 'animate-pulse', 'txt1 text-sm col-span-1')}
                    onClick={() => setOpen(!open)}
                  >
                    {open ? 'Hide' : 'Info'}
                  </button>
                </div>
              </div>
              <div className='bg1'>

                {open && <TableRowEditableFields />}
              </div>
            </div>
          )
        })}
      </div>
      <Pagination />

    </section>
  )
}

export default TableDisplay;