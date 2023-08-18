import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { Button } from '../../components'

export default function Page() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm()
  const router = useRouter()

  const submitForm = async (data) => {
    const { email, password, confirmPassword } = data;
    
    // Check if passwords match
    if (password !== confirmPassword) {
      setError("confirmPassword", {
        type: "custom",
        message: "Passwords do not match"
      });
      return;
    }

    const res = await fetch('/api/v1/sign-up/from-console', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password, confirmPassword }),
    })

    const json = await res.json()

    if (json.error || json?.message && json?.message.length > 0) {
      return;
    }

    router.push('/')
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://bhoyxrelzzohrygasyjt.supabase.co/storage/v1/object/public/public/logo.png"
          alt="IE Portals"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight " >
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(submitForm)}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 " >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                {...register("email", { required: "This field is required" })}
                className="block w-full rounded-md border-0  py-1.5  shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-teal-500 sm:text-sm sm:leading-6"
              />
              <div className='h-3'>
                {errors?.email?.message && <p className="text-sm text-red-600">{errors?.email?.message}</p>}
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 " >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                {...register("password", { required: "This field is required" })}
                className="block w-full rounded-md border-0  py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-teal-500 sm:text-sm sm:leading-6"
              />
              <div className='h-3'>
                {errors?.password?.message && <p className="text-sm text-red-600">{errors?.password?.message}</p>}
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 " >
                Confirm Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                {...register("confirmPassword", { required: "This field is required" })}
                className="text-black block w-full rounded-md border-0  py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-teal-500 sm:text-sm sm:leading-6"
              />
              <div className='h-3'>
                {errors?.confirmPassword?.message && <p className="text-sm text-red-600">{errors?.confirmPassword?.message}</p>}
              </div>
            </div>
          </div>

          <div>
            <Button
              type="submit"
            >
              Sign up
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
