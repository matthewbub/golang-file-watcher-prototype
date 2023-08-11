import React from 'react';
import {
  ImageUploadLarge,
  Input,
  TextArea,
  MultiColumnFormWrapper,
  Button
} from '../../../components';

const TableRowEditableFields = () => {
  return (
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
  )
}

export default TableRowEditableFields;