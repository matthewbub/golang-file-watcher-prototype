import { Input, Button, TextArea, Select } from '../../../components';
import { Fragment } from "react"
import { useForm, useController } from 'react-hook-form';
import { formConfigs } from '../constants/formConfigs';

const ProjectForm = () => {
  const { control, handleSubmit } = useForm();

  const customSubmit = (data) => {
    const dataset = {
      project: data[formConfigs.fields.projectField],
      description: data[formConfigs.fields.projectDescriptionField],
    }
    console.log('dataset', dataset)
  }

  const { field: projectField } = useController({
    name: formConfigs.fields.projectField,
    control,
    defaultValue: '',
  });

  const { field: projectDescriptionField } = useController({
    name: formConfigs.fields.projectDescriptionField,
    control,
    defaultValue: '',
  });

  return (
    <Fragment>
      <div className='mb-5'>
        <h1 className='text-base font-semibold leading-7 txt1'>New Project</h1>
        <p className='mt-1 max-w-2xl text-sm leading-6 txt2'>Create a new project.</p>
      </div>
      <form className='max-w-md grid gird-cols-12' onSubmit={handleSubmit(customSubmit)}>
        <Input
          label='Project Title'
          name="title"
          className='col-span-9'
          placeholder='Project Title'
          {...projectField}
        />
        <TextArea
          label='Description'
          name="description"
          className='col-span-12'
          placeholder='Describe what you did.'
          {...projectDescriptionField}
        />
        <div className='col-span-12 pt-10'>
          <Button type='submit'>
            Add Project
          </Button>
        </div>
      </form>
    </Fragment>
  )
}

export default ProjectForm;