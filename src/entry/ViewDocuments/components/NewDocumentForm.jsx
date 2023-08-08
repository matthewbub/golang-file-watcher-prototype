import { Input, Button, TextArea, Select } from '../../../components';
import { Fragment } from "react"
import { useForm } from 'react-hook-form';

const NewDocumentForm = () => {
  const { register } = useForm();

  return (
    <Fragment>
      <div className='mb-5'>
        <h1 className='text-base font-semibold leading-7 txt1'>New Document</h1>
        <p className='mt-1 max-w-2xl text-sm leading-6 txt2'>Create a new document.</p>
      </div>
      <div className='max-w-md grid gird-cols-12'>
        <Input
          label='Document Title'
          register={register}
          name="title"
          className='col-span-9'
          placeholder='Untitled Document'
        />
        <TextArea
          label='Description'
          register={register}
          name="description"
          className='col-span-12'
          placeholder='Enter anything you want here...'
        />
        <div className='col-span-12 pt-10'>
          <Button>
            Add Document
          </Button>
        </div>
      </div>
    </Fragment>
  )
}

export default NewDocumentForm;