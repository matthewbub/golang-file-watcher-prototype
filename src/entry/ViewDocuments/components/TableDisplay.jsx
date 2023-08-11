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
                {tableConfig.data[item].map((item, index) => {
                  const baseClassName = clsx(
                    tableConfig.colHeaders.find((col) => col.id === item.mapToId).colSpan,
                    tableConfig.colHeaders.find((col) => col.id === item.mapToId).className !== 'sr-only' && tableConfig.colHeaders.find((col) => col.id === item.mapToId).className,
                    'flex items-center h-16 text-sm',
                    index === 0 ? 'container-padding-left' : '',
                    index === tableConfig.colHeaders.length - 1 ? 'container-padding-right' : '',
                  );

                  if (item.mapToId === 4) {
                    return (
                      <div className={baseClassName}>
                        <button
                          className={clsx('a1', open && 'animate-pulse')}
                          onClick={() => setOpen(!open)}
                        >
                          {open ? 'Hide' : 'Info'}
                        </button>
                      </div>
                    )
                  }
                  return (
                    <div className={baseClassName}>
                      <span className='txt1 text-sm'>
                        {item.title}
                      </span>
                    </div>
                  )
                })}
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