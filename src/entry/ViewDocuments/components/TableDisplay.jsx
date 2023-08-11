import React, { useState } from 'react';
import clsx from 'clsx';
import TableRowEditableFields from './TableRowEditableFields';
import { tableConfig } from '../constants';
import TableHeadings from './TableHeadings';

const TableDisplay = () => {
  return (
    <section className='w-full'>
      <TableHeadings />
      <div className='iep--table w-full'>
        {Object.keys(tableConfig.data).map((item, index) => {
          const [open, setOpen] = useState(false);

          return (
            <div key={index} className={clsx(
              open ? 'border border-dashed border-teal-500' : 'border border-transparent',
              'focus-within:border focus-within:border-teal-500',
            )}>
              <div className='iep--table-row grid grid-cols-12 gap-2 hover:bg3'>
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
              {open && <TableRowEditableFields />}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default TableDisplay;