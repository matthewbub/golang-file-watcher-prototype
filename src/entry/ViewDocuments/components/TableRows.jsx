import React, { useState } from 'react';
import clsx from 'clsx';
import TableRowEditableFields from './TableRowEditableFields';
import { tableConfig } from '../constants';
import { useAccordionsList, useDocumentList } from "../state";

const EmptyTableRows = ({ show, label }) => {
  if (!show) return null;

  return (
    <div className='iep--table-row w-full h-96 flex items-center justify-center'>
      <p className='txt2'>{label}</p>
    </div>
  )
}

const TableRows = () => {
  const documentsList = useDocumentList((state) => state.documents);
  const accordionList = useAccordionsList((state) => state.accordions);
  const openAccordion = useAccordionsList((state) => state.openAccordion);
  const closeAccordion = useAccordionsList((state) => state.closeAccordion);

  return (
    <div className='iep--table w-full min-h-[384px]'>
      <EmptyTableRows
        label='No documents'
        show={Object.keys(tableConfig.data).length === 0}
      />
      {documentsList && documentsList.length && documentsList.map((item, index) => {
        const [open, setOpen] = useState(false);
        return (
          <div
            key={index}
            className={clsx(
              accordionList[item[4]] && 'border border-dashed border-teal-500',
              'focus-within:border focus-within:border-teal-500',
            )}>
            <div className={clsx(
              'iep--table-row grid grid-cols-12 gap-2 hover:bg3',
              'border-t border-white/20'
            )}>
              <div className={'container-padding-left flex items-center h-16 text-sm col-span-10 sm:col-span-7'}>
                <a href={`/documents/${item[4]}`} className='inline-block w-full'>
                  <span className='txt1 text-sm'>
                    {item[1]}
                  </span>
                </a>
              </div>
              <div className={'items-center h-16 text-sm sm:flex hidden col-span-2'}>
                <span className='txt1 text-sm sm:flex hidden col-span-2'>
                  {item[2]}
                </span>
              </div>
              <div className={'items-center h-16 text-sm sm:flex hidden col-span-2'}>
                <span className='txt1 text-sm sm:flex hidden col-span-2'>
                  {item[3]}
                </span>
              </div>
              <div className={'flex items-center h-16 text-sm'}>
                <button
                  className={clsx('a1', accordionList[item[4]] && 'animate-pulse', 'txt1 text-sm col-span-1')}
                  onClick={() => {
                    if (accordionList[item[4]]) {
                      closeAccordion(item[4])
                    } else {
                      openAccordion(item[4])
                    }
                  }}
                >
                  {accordionList[item[4]] ? 'Hide' : 'Info'}
                </button>
              </div>
            </div>
            <div className='bg1'>
              {accordionList[item[4]] && <TableRowEditableFields />}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default TableRows;