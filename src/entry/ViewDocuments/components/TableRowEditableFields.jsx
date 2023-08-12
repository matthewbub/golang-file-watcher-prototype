import React from 'react';
import { useForm, useController } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';

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

  // slug 
  const { field: slugField } = useController({
    name: 'slug',
    control,
    defaultValue: '',
  });

  // category
  const { field: categoryField } = useController({
    name: 'category',
    control,
    defaultValue: '',
  });

  // title
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
      <form className='col-span-2' onSubmit={handleSubmit(customSubmit)}>
        <Input
          label='Document Name'
          placeholder='Untitled Document'
          {...titleField}
        />
        <Input
          label='Slug'
          placeholder='/untitled-document'
          {...slugField}
        />
        <Input
          label='Category'
          placeholder='General'
          {...categoryField}
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

  const { field: descriptionField } = useController({
    name: 'description',
    control,
    defaultValue: '',
  });

  const {
    field: { ref: imageRef, ...imageField },
  } = useController({
    name: 'image',
    control,
    defaultValue: null,
  });

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      imageField.onChange(acceptedFiles[0]);
    },
  });

  return (
    <MultiColumnFormWrapper
      title='Modify SEO'
      description='Modify and apply changes to SEO related fields here.'
      headingSize='small'
      className='mb-10 pt-5'
    >
      <form className='col-span-2' onSubmit={handleSubmit(customSubmit)}>
        <Input
          label='Document Title'
          placeholder='Untitled Document'
          {...titleField}
        />
        <TextArea
          label='Document Description'
          placeholder='Untitled Document'
          {...descriptionField}
        />
        <ImageUploadLarge
          label='Primary Image'
          {...imageField}
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