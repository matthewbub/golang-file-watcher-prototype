import { Input, Button, TextArea, Select } from '../../../components';
import { Fragment } from "react"
import { useForm } from 'react-hook-form';

const TimeLogForm = () => {
  const { register } = useForm();
  return (
    <Fragment>
      <div className=''>
        <h1 className='text-base font-semibold leading-7 txt1'>Quick Log</h1>
        <p className='mt-1 max-w-2xl text-sm leading-6 text-gray-400'>Add time spent working on a task.</p>
      </div>
      <div className='max-w-md grid gird-cols-12'>
        <Input
          label='Title'
          register={register}
          name="title"
          className='col-span-9'
        />
        <Input
          label='Date'
          register={register}
          name="date"
          type="datetime-local"
          className='col-span-9'
        />
        <Input
          label='Time Spent'
          register={register}
          name="time-spent"
          className='col-span-9'
          placeholder='HH:MM'
        />
        <TextArea
          label='Description'
          register={register}
          name="description"
          className='col-span-12'
          placeholder='Describe what you did.'
        />
        <div className='col-span-12 pt-10'>
          <Button>
            Log Time
          </Button>
        </div>
      </div>
    </Fragment>
  )
}

export default TimeLogForm;