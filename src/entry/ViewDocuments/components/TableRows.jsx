import React, { useState } from 'react';
import clsx from 'clsx';
import TableRowEditableFields from './TableRowEditableFields';
import { tableConfig } from '../constants';

const EmptyTableRows = ({ show, label }) => {
  if (!show) return null;

  return (
    <div className='iep--table-row w-full h-96 flex items-center justify-center'>
      <p className='txt2'>{label}</p>
    </div>
  )
}

const TableRows = () => {
  return (
    <div className='iep--table w-full min-h-[384px]'>
      <EmptyTableRows
        label='No documents'
        show={Object.keys(tableConfig.data).length === 0}
      />
      {Object.keys(tableConfig.data).map((item, index) => {
        const [open, setOpen] = useState(false);
        return (
          <div
            key={index}
            className={clsx(
              open && 'border border-dashed border-teal-500',
              'focus-within:border focus-within:border-teal-500',
            )}>
            <div className={clsx(
              'iep--table-row grid grid-cols-12 gap-2 hover:bg3',
              'border-t border-white/20'
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
  )
}

export default TableRows;