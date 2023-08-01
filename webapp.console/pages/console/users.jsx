import { useState, useEffect } from 'react'
import { ConsoleLayout } from '@/components/ConsoleLayout';
import { SlideOver } from '@/components/SlideOver';
import { useForm } from 'react-hook-form';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { Select } from '../../components/Select/Select';
import { Modal } from '../../components';

export const isStrongPassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

const SubmitButton = ({ children, className }) => (
  <div className='col-span-4'>
    <Button className='text-center mt-24'>
      Add User
    </Button>
  </div>
)

const UsersPage = ({ primaryTitle, secondaryTitle, data, form }) => {
  const [open, setOpen] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [passwordMatchError, setPasswordMatchError] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [formData, setFormData] = useState(null); // [email, password, auth_type
  const { register, handleSubmit, formState: { errors }, setError } = useForm();


  const [formErrors, setFormErrors] = useState({});


  const submitForm = async () => {
    const response = await fetch('/api/v1/sign-up/from-console', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    const { error, data: token } = await response.json();

    if (error) {
      if (error.message === 'User already exists') {
        setError('email', 'User already exists');
      }
      return;
    }

    setFormData(null);
    window.location.reload();
  }

  const confirmBeforeSubmission = async (formData) => {
    // Reset errors
    setEmailError(null);
    setPasswordError(null);
    setPasswordMatchError(null);

    // email is required
    if (!formData?.email) {
      setEmailError('Email is required');
      return;
    }

    // email should be valid
    if (!formData?.email.includes('@')) {
      setPasswordError('Invalid email');
      return;
    }

    // password is required
    if (!formData?.password) {
      setPasswordError('Password is required');
      return;
    }

    // password should be at least 8 characters long
    if (formData?.password < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    }

    // password should have 1 cap
    if (!formData?.password.match(/[A-Z]/)) {
      setPasswordError('Password must contain at least one uppercase letter');
      return;
    }

    // password should have 1 small
    if (!formData?.password.match(/[a-z]/)) {
      setPasswordError('Password must contain at least one lowercase letter');
      return;
    }

    // password should have 1 number
    if (!formData?.password.match(/[0-9]/)) {
      setPasswordError('Password must contain at least one number');
      return
    }

    // password should have 1 special character
    if (!formData?.password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)) {
      setPasswordError('Password must contain at least one special character');
      return
    }

    // Check if passwords match
    if (formData?.password !== formData['confirm-password']) {
      setPasswordMatchError('Passwords do not match');
      return;
    }

    setFormData(formData);
    setConfirm(true);
  }

  const formFields = [
    {
      label: 'Email',
      name: 'email',
      type: 'text',
      className: 'col-span-12',
      field: 'Input',
      error: emailError
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
      className: 'col-span-9',
      field: 'Input',
      error: passwordError
    },
    {
      label: 'Confirm Password',
      name: 'confirm-password',
      type: 'password',
      className: 'col-span-9',
      field: 'Input',
      error: passwordMatchError
    },
    {
      label: 'Role',
      name: 'auth_type',
      type: 'select',
      className: 'col-span-9',
      options: [
        { id: 'iep', name: 'IEP Client' },
        { id: 'tenant', name: 'Tenant' },
        { id: 'console', name: 'Console User' }
      ],
      field: 'Select'
    },
    {
      label: 'Phone',
      name: 'phone',
      type: 'text',
      className: 'col-span-9',
      field: 'Input',
    },
    {
      label: 'Create User',
      name: 'submit',
      type: 'submit',
      className: 'col-span-4',
      field: 'SubmitButton'
    }
  ]

  return (
    <>
      <ConsoleLayout
        reverseLayout={true}
        primary={() => (
          <div>
            <pre>
              <code>
                {JSON.stringify(data, null, 2)}
              </code>
            </pre>
          </div>
        )}
        secondary={() => (<h2>Hello!!</h2>)}
        primaryTitle={primaryTitle}
        secondaryTitle={secondaryTitle}
        primaryAction={() => <Button onClick={() => { setOpen(true) }} className=''>Add User</Button>}
        breadcrumbs={[
          { name: 'Users', href: '/users', current: true }
        ]}
      />
      <SlideOver
        open={open}
        setOpen={setOpen}
        title="Create a new user"
      >
        <form className='grid grid-cols-12 gap-5' onSubmit={handleSubmit(confirmBeforeSubmission)}>
          {formFields.map((field, index) => {
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
        title={'Confirm User Creation'}
        description={'Are you sure you want to create this user?'}
        primaryAction={() => { submitForm() }}
        primaryActionText={'Create User'}
        secondaryAction={() => {
          setConfirm(false)
          setFormData(null)
        }}
        secondaryActionText={'Cancel'}
      />
    </>

  )
}

export { getServerSideProps } from '../../ssp/console/users';
export default UsersPage;