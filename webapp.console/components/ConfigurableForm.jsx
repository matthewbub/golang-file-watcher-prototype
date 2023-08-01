import { useState, useEffect } from 'react'
import { SlideOver } from '@/components/SlideOver';
import { useForm } from 'react-hook-form';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { Select } from '@/components/Select/Select';
import { Modal } from '@/components';

const SubmitButton = () => (
  <div className='col-span-4'>
    <Button className='text-center mt-24'>
      Submit
    </Button>
  </div>
)

export const ConfigurableForm = ({
  form,
  open,
  setOpen,
  slideOverTitle,
  confirmModalTitle = 'Confirm',
  confirmModalDescription = 'Are you sure you want to submit this form?',
  confirmModalPrimaryAction = 'Submit Form',
  submitForm = (formFields) => { return formFields; },
  confirmBeforeSubmission = (formFields) => { return formFields; },
}) => {
  const [confirm, setConfirm] = useState(false);
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const [formErrors, setFormErrors] = useState({});

  return (
    <>
      <SlideOver
        open={open}
        setOpen={setOpen}
        title={slideOverTitle}
      >
        <form className='grid grid-cols-12 gap-5' onSubmit={handleSubmit(confirmBeforeSubmission)}>
          {form.formFields.map((field, index) => {
            let Field = null;
            switch (field.field) {
              case 'Input':
                Field = Input;
                break;
              case 'Select':
                Field = Select;
                break;
              case 'SubmitButton':
                Field = SubmitButton;
                break;
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
              />
            )
          })}
        </form>
      </SlideOver>
      <Modal
        open={confirm}
        setOpen={setConfirm}
        title={confirmModalTitle}
        description={confirmModalDescription}
        primaryAction={() => { submitForm() }}
        primaryActionText={confirmModalPrimaryAction}
        secondaryAction={() => {
          setConfirm(false)
          setFormData(null)
        }}
        secondaryActionText={'Cancel'}
      />
    </>
  )
}