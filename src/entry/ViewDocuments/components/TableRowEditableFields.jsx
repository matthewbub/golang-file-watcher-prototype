import React from 'react';
import { useForm, useController } from 'react-hook-form';

import {
  ImageUploadLarge,
  Input,
  TextArea,
  MultiColumnFormWrapper,
  Button
} from '../../../components';
import clsx from 'clsx';

const ModifyDocumentForm = () => {
  const { control, handleSubmit } = useForm();
  const customSubmit = (data) => {
    console.log(data);
  }

  const { field: titleField } = useController({
    name: 'title',
    control,
    defaultValue: '',
  });


  return (
    <MultiColumnFormWrapper
      title='Modify Document'
      description='Select any field to modify it.'
      className='mb-10 pt-5'
      headingSize='small'
    >
      <form className='col-span-2'>
        <Input
          label='Document Name'
          placeholder='Untitled Document'
        />
        <Input
          label='Slug'
          placeholder='/untitled-document'
        />
        <Input
          label='Category'
          placeholder='General'
        />
        <div className='mt-6'>
          <Button>
            {'Save'}
          </Button>
        </div>
      </form>
    </MultiColumnFormWrapper>
  )
}

const ModifySEOForm = () => {
  const { control, handleSubmit } = useForm();
  const customSubmit = (data) => {
    console.log(data);
  }

  const { field: titleField } = useController({
    name: 'title',
    control,
    defaultValue: '',
  });

  return (
    <MultiColumnFormWrapper
      title='Modify SEO'
      description='Modify and apply changes to SEO related fields here.'
      headingSize='small'
      className='mb-10 pt-5'
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
  )
}

const DeleteDocumentForm = () => {
  return (
    <MultiColumnFormWrapper
      title='Delete Document'
      description='Delete this document permanently. This action cannot be undone.'
      className='mb-10 pt-5'
      headingSize='small'
    >
      <form className="flex items-start md:col-span-2">
        <button
          type="submit"
          className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold txt1 shadow-sm hover:bg-red-400"
        >
          Yes, delete this document
        </button>
      </form>
    </MultiColumnFormWrapper>
  )
}
const TableRowEditableFields = () => {
  const tabs = [
    { name: 'Stats', href: '#', current: true },
    { name: 'Edit', href: '#', current: false },
  ]
  return (
    <div className={clsx(
      'w-full bg1',
      'border-t border-white/20',
      'divide-solid divide-y divide-white/20'
    )}>

      <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 mt-5 sm:px-6 md:grid-cols-3 lg:px-8">
        <nav className="flex space-x-4" aria-label="Tabs">
          {tabs.map((tab) => (
            <a
              key={tab.name}
              href={tab.href}
              className={clsx(
                tab.current ? 'bg-teal-100/50 text-white outline outline-teal-500' : 'text-gray-500 hover:text-gray-700',
                'px-3 py-0.5 text-sm font-medium'
              )}
              aria-current={tab.current ? 'page' : undefined}
            >
              {tab.name}
            </a>
          ))}
        </nav>
      </div>
      <ModifyDocumentForm />
      <ModifySEOForm />
      <DeleteDocumentForm />
    </div>
  )
}

export default TableRowEditableFields;