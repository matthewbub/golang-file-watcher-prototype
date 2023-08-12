import React from 'react';
import { useForm, useController } from 'react-hook-form';

import {
  ImageUploadLarge,
  Input,
  TextArea,
  MultiColumnFormWrapper,
  Button,
  Tabs
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
    { label: 'Stats', href: '#', current: true, as: 'a' },
    { label: 'Edit', href: '#', current: false, as: 'a' },
  ]
  return (
    <div className={clsx(
      'w-full bg1',
      'border-t border-white/20',
      'divide-solid divide-y divide-white/20'
    )}>

      <Tabs tabs={tabs} />
      <ModifyDocumentForm />
      <ModifySEOForm />
      <DeleteDocumentForm />
    </div>
  )
}

export default TableRowEditableFields;