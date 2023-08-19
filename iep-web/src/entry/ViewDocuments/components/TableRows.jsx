import React, { useState } from 'react';
import clsx from 'clsx';
import TableRowEditableFields from './TableRowEditableFields';
import { tableConfig } from '../constants';
import { useAccordionsList, useDocumentList } from "../state";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { upperFirst, toLower } from 'lodash';
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
        return (
          <div
            key={index}
            className={clsx(
              accordionList[item.documentId] && 'border border-dashed border-teal-500',
              'focus-within:border focus-within:border-teal-500',
            )}>
            <div className={clsx(
              'iep--table-row grid grid-cols-12 gap-2 hover:bg3',
              'border-t border-white/20',
              'container-padding'
            )}>
              <div className={'flex items-center text-sm col-span-10'}>
                <a href={`/documents/${item.documentId}`} className='inline-block w-full'>
                  <span className='txt1 text-sm font-bold'>
                    {item.documentTitle}
                  </span>
                </a>
              </div>
              <div className={'col-span-2 flex items-center justify-end'}>
                <button
                  className={clsx('a1', accordionList[item.documentId] && 'animate-pulse', 'txt1 text-sm')}
                  onClick={() => {
                    if (accordionList[item.documentId]) {
                      closeAccordion(item.documentId)
                    } else {
                      openAccordion(item.documentId)
                    }
                  }}
                >
                  {accordionList[item.documentId] ? <span className='text-sm text-teal-600 hover:text-teal-700'>{'Collapse'}</span> : <span className='text-sm text-teal-600 hover:text-teal-700'>{'Quick Edit'}</span>}
                </button>
              </div>
              <div className={'text-sm col-span-12 flex flex-col'}>
                <a href={`/documents/${item.documentId}`} className='inline-flex flex-col w-full space-y-4'>
                  <span className='txt2 text-sm'>
                    {'Created '} {item.dateCreated} {' · Last modified '}{item.lastUpdated}
                  </span>

                  <div className='bg-teal-700/20 border-teal-500 border rounded w-fit px-4 py-0.5'>
                    <span className='txt2 text-sm'>
                      {item?.documentCategory?.category || 'No category'}
                    </span>
                  </div>
                </a>
              </div>
            </div>
            <div className='bg1'>
              {accordionList[item.documentId] && <TableRowEditableFields documentId={item.documentId} />}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default TableRows;