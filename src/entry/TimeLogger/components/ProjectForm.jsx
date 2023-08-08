import { Input, Button, TextArea, Select } from '../../../components';
import { Fragment } from "react"
import { useForm } from 'react-hook-form';

const ProjectForm = () => {
  const { register } = useForm();

  return (
    <Fragment>
      <div className='mb-5'>
        <h1 className='text-base font-semibold leading-7 txt1'>New Project</h1>
        <p className='mt-1 max-w-2xl text-sm leading-6 txt2'>Create a new project.</p>
      </div>
      <div className='max-w-md grid gird-cols-12'>
        <Input
          label='Project Title'
          register={register}
          name="title"
          className='col-span-9'
          placeholder='Project Title'
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
            Add Project
          </Button>
        </div>
      </div>
    </Fragment>
  )
}

export default ProjectForm;