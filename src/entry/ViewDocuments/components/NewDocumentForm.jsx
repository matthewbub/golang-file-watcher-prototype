import { Input, Button, TipTap } from '../../../components';
import { Fragment } from "react"
import { useForm, useController } from 'react-hook-form';

const NewDocumentForm = () => {
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

  return (
    <Fragment>
      <div className='mb-5'>
        <h1 className='text-base font-semibold leading-7 txt1'>New Document</h1>
        <p className='mt-1 max-w-2xl text-sm leading-6 txt2'>Create a new document.</p>
      </div>
      <form
        className='max-w-lg grid gird-cols-12'
        onSubmit={handleSubmit(customSubmit)}
      >
        <Input
          {...titleField}
          label='Document Title'
          name="title"
          className='col-span-9'
          placeholder='Untitled Document'
        />
        <TipTap
          {...descriptionField}
          label='Description'
          name="description"
          className='col-span-12'
          placeholder='Enter anything you want here...'
        />
        <div className='col-span-12 pt-10'>
          <Button type='submit'>
            Add Document
          </Button>
        </div>
      </form>
    </Fragment>
  )
}

export default NewDocumentForm;