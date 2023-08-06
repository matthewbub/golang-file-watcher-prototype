import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { get } from 'lodash';

import { SlideOver } from '@/src/components/SlideOver';
import { Modal } from '@/src/components';
import TextArea from '@/src/components/TextArea';
import { Button, Select, Input } from '@/src/components';

const SubmitButton = ({ children }) => (
  <div className='col-span-4'>
    <Button className='text-center mt-12'>
      {children || 'Submit'}
    </Button>
  </div>
)

export const ConfigurableForm = ({
  form,
  open,
  setOpen,
  slideOverTitle,
  submitForm = (formFields) => { return formFields; },
}) => {
  const { register, handleSubmit } = useForm();
  const formFields = get(form, 'formFields', []);

  return (
    <SlideOver
      open={open}
      setOpen={setOpen}
      title={slideOverTitle}
    >
      <form className='grid grid-cols-12 gap-5' onSubmit={handleSubmit(submitForm)}>
        {formFields.map((field, index) => {
          let Field = null;
          switch (field.field) {
            case 'Divider':
              return (
                <div className='col-span-12 mt-2 mb-12'>
                  <div className='border-b border-white/20 h-2' />
                </div>
              );
            case 'Input':
              Field = Input;
              break;
            case 'TextArea':
              Field = TextArea;
              break;
            case 'Select':
              Field = Select;
              break;
            case 'SubmitButton':
              return (
                <SubmitButton>
                  {field.label}
                </SubmitButton>
              );
            default:
              Field = Input;
              break;
          }

          return (
            <Field
              key={index}
              label={field.label}
              name={field.name}
              type={field.type}
              error={field.error || null}
              register={register}
              className={field.className}
              options={field.options}
              registerOptions={field.validate}
              defaultValue={field.defaultValue}
            />
          )
        })}
      </form>
    </SlideOver>
  )
}