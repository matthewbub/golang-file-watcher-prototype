import React, { useEffect } from 'react';
import { useForm, useController } from 'react-hook-form';
import { get } from 'lodash';
import {
  ImageUploadLarge,
  Input,
  TextArea,
  MultiColumnFormWrapper,
  Button,
  Tabs
} from '../../../components';
import clsx from 'clsx';
import { useDocumentList } from '../state';

const ModifyDocumentForm = ({ document }) => {
  const { control, handleSubmit, watch, setValue } = useForm();

  // console.log(document);

  const customSubmit = async (data) => {
    const response = await fetch('/api/v1/secure/', {
      method: 'POST',
      body: JSON.stringify({
        title: data.title,
        slug: data.slug,
        category: data.category,
        id: '123'
      })
    });
    const json = await response.json();
    console.log(json);
  }

  const slugFieldDefaultValue = get(document, 'documentUrl', '');
  const { field: slugField } = useController({
    name: 'slug',
    control,
    defaultValue: slugFieldDefaultValue,
  });
  const watchSlug = watch('slug');

  const categoryFieldDefaultValue = get(document, 'documentCategory', '');
  const { field: categoryField } = useController({
    name: 'category',
    control,
    defaultValue: categoryFieldDefaultValue,
  });

  const titleFieldDefaultValue = get(document, 'documentTitle', '');
  const { field: titleField } = useController({
    name: 'title',
    control,
    defaultValue: titleFieldDefaultValue,
  });

  useEffect(() => {
    const handleSlugChange = () => {
      if (watchSlug && watchSlug.length > 0) {
        const slug_mustBeLowerCase_replaceSpacesWithDashes_removeNonAlphaNumericCharacters = watchSlug.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        setValue('slug', slug_mustBeLowerCase_replaceSpacesWithDashes_removeNonAlphaNumericCharacters);
      }
    }

    handleSlugChange();
  }, [watchSlug]);

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

const ModifySEOForm = ({ document }) => {
  const { control, handleSubmit } = useForm();

  const customSubmit = async (data) => {
    const response = await fetch('/api/v1/secure/', {
      method: 'POST',
      body: JSON.stringify({
        page_title: data.page_title,
        description: data.description,
        image: data.image,
        id: '123'
      })
    });
    const json = await response.json();

    console.log(json);

  }

  const titleFieldFallBackValue = get(document, 'documentTitle', '');
  const titleFieldDefaultValue = get(document, 'documentSeoTitle', titleFieldFallBackValue);
  const { field: titleField } = useController({
    name: 'page_title',
    control,
    defaultValue: titleFieldDefaultValue
  });

  const descriptionFieldFallBackValue = get(document, 'documentDescription', '');
  const { field: descriptionField } = useController({
    name: 'description',
    control,
    defaultValue: descriptionFieldFallBackValue
  });

  const imageFieldFallBackValue = get(document, 'documentImage', null);
  const { field: imageField, } = useController({
    name: 'image',
    control,
    defaultValue: imageFieldFallBackValue,
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

const DeleteDocumentForm = ({ document }) => {
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

const TableRowEditableFields = ({ documentId }) => {
  const document = useDocumentList((state) => state.documents).find((item) => item.documentId === documentId);
  const tabs = [
    { label: 'Stats', href: '#', current: false, as: 'a' },
    { label: 'Edit', href: '#', current: true, as: 'a' },
  ]
  return (
    <div className={clsx(
      'w-full bg1',
      'border-t border-white/20',
      'divide-solid divide-y divide-white/20'
    )}>
      <Tabs tabs={tabs} />
      <ModifyDocumentForm document={document} />
      <ModifySEOForm document={document} />
      <DeleteDocumentForm document={document} />
    </div>
  )
}

export default TableRowEditableFields;