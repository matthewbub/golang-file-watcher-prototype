import React, { useState } from 'react';
import { ImageUploadLarge, Input, Stats, TextArea, MultiColumnFormWrapper, Button } from '../../../components';
import clsx from 'clsx';

const fdata = {
  colHeaders: [
    {
      id: 1,
      title: 'Document Name',
      colSpan: 'col-span-5',
    },
    {
      id: 2,
      title: 'Categories',
      colSpan: 'col-span-3',
    },
    {
      id: 3,
      title: 'Date Created',
      colSpan: 'col-span-2',
    },
    {
      id: 4,
      title: 'Edit',
      colSpan: 'col-span-2',
    },
  ],
  data: {
    1: [
      {
        mapToId: 1,
        title: 'Untitled Document',
      },
      {
        mapToId: 2,
        title: 'General',
      },
      {
        mapToId: 3,
        title: '12/12/2020',
      },
      {
        mapToId: 4,
        title: 'Edit',
      }
    ]
  }
}

const TableDisplay = ({ data = fdata }) => {
  return (
    <>
      <Stats
        stats={[
          {
            name: 'Total Documents',
            value: '-'
          },
          {
            name: 'Average Read Time',
            value: '-',
          },
          {
            name: 'Total Read Time',
            value: '-',
          },
          {
            name: 'Total Views',
            value: '-',
          },
        ]}
        loading={true}
      />
      <section className='w-full'>
        <div className='iep--table-heading w-full bg2 h-11 grid grid-cols-12 gap-2'>
          {data.colHeaders.map((item, index) => {
            return (
              <div className={clsx(
                item.colSpan,
                'flex items-center',
                index === 0 ? 'container-padding-left' : '',
                index === data.colHeaders.length - 1 ? 'sr-only' : '',
              )}>
                {item.title}
              </div>
            )
          })}
        </div>
        <div className='iep--table w-full'>
          {Object.keys(data.data).map((item, index) => {
            const [open, setOpen] = useState(false);

            return (
              <div key={index} className='border-transparent focus-within:border focus-within:border-teal-500'>
                <div className='iep--table-row grid grid-cols-12 gap-2 hover:bg3'>
                  {data.data[item].map((item, index) => {
                    const baseClassName = clsx(
                      data.colHeaders.find((col) => col.id === item.mapToId).colSpan,
                      'flex items-center h-16',
                      index === 0 ? 'container-padding-left' : '',
                      index === data.colHeaders.length - 1 ? 'container-padding-right' : '',
                    );

                    if (item.mapToId === 4) {
                      return (
                        <div className={baseClassName}>
                          <button className='a1' onClick={() => setOpen(!open)}>
                            {open ? 'Collapse' : 'Modify'}
                          </button>
                        </div>
                      )
                    }
                    return (
                      <div className={baseClassName}>
                        {item.title}
                      </div>
                    )
                  })}
                </div>
                {open && (
                  <div className='w-full border-t border-white/20 min-h-11 container-padding-y'>
                    <MultiColumnFormWrapper
                      title='Modify Document'
                      description='Select any field to modify it.'
                    >
                      <div className='col-span-2'>
                        <Input
                          label='Document Name'
                          placeholder='Untitled Document'
                        />
                        <Input
                          label='Slug'
                          placeholder='/untitled-document'
                        />
                        <Input
                          label='Categories'
                          placeholder='General'
                        />
                        <div className='mt-6'>
                          <Button>
                            {'Save'}
                          </Button>
                        </div>
                      </div>
                    </MultiColumnFormWrapper>
                    <MultiColumnFormWrapper
                      title='Modify SEO'
                      description='Modify and apply changes to SEO related fields here.'
                    >
                      <div className='col-span-2'>
                        <Input
                          label='Document Title'
                          placeholder='Untitled Document'
                        />
                        <TextArea
                          label='Document Description'
                          placeholder='Untitled Document'
                        />
                        <ImageUploadLarge
                          label='Primary Image'
                        />
                        <div className='mt-6'>
                          <Button>
                            {'Save'}
                          </Button>
                        </div>
                      </div>
                    </MultiColumnFormWrapper>

                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default TableDisplay;