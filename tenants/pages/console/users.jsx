import { useState } from 'react'
import { ConsoleLayout } from '9mbs/components/ConsoleLayout';
import { SlideOver } from '9mbs/components/SlideOver';
import { useForm } from 'react-hook-form';
import Input from '9mbs/components/Input';
import Button from '9mbs/components/Button';
import { supabase } from '../../supabase.config';

export const isStrongPassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};


const UsersPage = ({ primaryTitle, secondaryTitle, data }) => {
  const [open, setOpen] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [passwordMatchError, setPasswordMatchError] = useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const submitForm = async (data) => {
    // Reset errors
    setEmailError(null);
    setPasswordError(null);
    setPasswordMatchError(null);

    if (!isStrongPassword(data.password)) {
      setPasswordMatchError('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character');
      return;
    }

    // Check if passwords match
    if (data.password !== data['confirm-password']) {
      setPasswordMatchError('Passwords do not match');
      return;
    }

    const response = await fetch('/api/sign-up', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    const { error, data: token } = await response.json();

    if (error) {
      if (error.message === 'User already exists') {
        setEmailError('User already exists');
      }
      return;
    }

    console.log(token);
  }

  return (
    <>
      <ConsoleLayout
        reverseLayout={true}
        primary={() => (
          <>
            <button onClick={() => { setOpen(true) }} className=''>Add User</button>
            <div>
              <pre>
                <code>
                  {JSON.stringify(data, null, 2)}
                </code>
              </pre>
            </div>
          </>
        )}
        secondary={() => (<h2>Hello!!</h2>)}
        primaryTitle={primaryTitle}
        secondaryTitle={secondaryTitle}
      />
      <SlideOver
        open={open}
        setOpen={setOpen}
        title="Create a new user"
      >
        <form className='grid grid-cols-12 gap-5' onSubmit={handleSubmit(submitForm)}>
          <Input
            label='Email'
            name='email'
            register={register}
            className='col-span-12'
            error={emailError}
          />
          <Input
            label='Password'
            name='password'
            register={register}
            className='col-span-9'
            type='password'
            error={passwordError}
          />
          <Input
            label='Confirm Password'
            name='confirm-password'
            register={register}
            className='col-span-9'
            type='password'
            error={passwordMatchError}
          />
          <div className='col-span-4'>

            <Button className='text-center mt-24'>
              Add User
            </Button>
          </div>
        </form>

      </SlideOver>
    </>

  )
}

export const getServerSideProps = async () => {
  const { data, error } = await supabase.from('users').select('created_at, email, id, phone');

  if (error) {
    console.error(error);
    return {
      props: {
        primaryTitle: 'Users',
        secondaryTitle: 'Recent actions',
        data: [],
      }
    }
  }

  return {
    props: {
      primaryTitle: 'Users',
      secondaryTitle: 'Recent actions',
      data: data,
    }
  }
}

export default UsersPage;