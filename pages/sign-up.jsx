// pages/signup.js

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

export default function SignUp() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/v2/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status === 201) {
        router.push('/dashboard'); // redirect to login page after successful registration
      } else {
        // handle any other HTTP status
        const errorData = await response.json();
        console.error(errorData);
      }
    } catch (err) {
      console.error(err);
      // handle error
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" {...register('username', { required: true })} />
        {errors.username && <span>This field is required</span>}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" {...register('password', { required: true })} />
        {errors.password && <span>This field is required</span>}
      </div>
      <button type="submit">Register</button>
    </form>
  );
}
