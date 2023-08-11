import { Input, Button, TextArea, Select } from '../../../components';
import { Fragment } from "react"
import { useForm, useController } from 'react-hook-form';
import { formConfigs } from '../constants/formConfigs';
import { get } from 'lodash';

const TimeLogForm = () => {
  const { control, handleSubmit } = useForm();

  const customSubmit = (data) => {
    const dataset = {
      title: data[formConfigs.fields.titleField],
      date: data[formConfigs.fields.dateField],
      timeSpent: data[formConfigs.fields.timeSpentField],
      description: data[formConfigs.fields.descriptionField],
    }
    console.log('dataset', dataset)
  }

  const { field: titleField } = useController({
    name: formConfigs.fields.titleField,
    control,
    defaultValue: '',
  });

  const { field: dateField } = useController({
    name: formConfigs.fields.dateField,
    control,
    defaultValue: '',
  });

  const { field: timeField } = useController({
    name: formConfigs.fields.timeSpentField,
    control,
    defaultValue: '',
  });

  const { field: descriptionField } = useController({
    name: formConfigs.fields.descriptionField,
    control,
    defaultValue: '',
  });

  return (
    <Fragment>
      <div className=''>
        <h1 className='text-base font-semibold leading-7 txt1'>Quick Log</h1>
        <p className='mt-1 max-w-2xl text-sm leading-6 text-gray-400'>Add time spent working on a task.</p>
      </div>
      <form className='max-w-md grid gird-cols-12' onClick={handleSubmit(customSubmit)}>
        <Input
          label='Title'
          name="title"
          className='col-span-9'
          {...titleField}
        />
        <Input
          label='Date'
          name="date"
          type="datetime-local"
          className='col-span-9'
          {...dateField}
        />
        <Input
          label='Time Spent'
          name="time-spent"
          className='col-span-9'
          placeholder='HH:MM'
          {...timeField}
        />
        <TextArea
          label='Description'
          name="description"
          className='col-span-12'
          placeholder='Describe what you did.'
          {...descriptionField}
        />
        <div className='col-span-12 pt-10'>
          <Button>
            Log Time
          </Button>
        </div>
      </form>
    </Fragment>
  )
}

export default TimeLogForm;