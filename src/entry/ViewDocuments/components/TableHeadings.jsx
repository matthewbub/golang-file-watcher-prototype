import React, { useState } from 'react';
import { ImageUploadLarge, Input, Stats, TextArea, MultiColumnFormWrapper, Button } from '../../../components';
import clsx from 'clsx';
import TableRowEditableFields from './TableRowEditableFields';
import { tableConfig } from '../constants';
import { get } from 'lodash';

const TableHeadings = () => {
  return (
    <div
      id='iep--table-heading-04234'
      className='w-full bg2 h-11 grid grid-cols-12 gap-2'
    >
      {tableConfig.colHeaders.map((item, index) => {
        const lastItem = get(tableConfig.colHeaders, `[${tableConfig.colHeaders.length - 1}]`, null);
        const lastItemIndex = tableConfig.colHeaders.length - 1;
        return (
          <div className={clsx(
            'flex items-center',
            item.colSpan,
            index === 0 && 'container-padding-left',
            index === lastItemIndex && lastItem ? lastItem.className : 'container-padding-right',
          )}>
            <span className='text-sm font-bold leading-6 txt2'>
              {item.title}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default TableHeadings;