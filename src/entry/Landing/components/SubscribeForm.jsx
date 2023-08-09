import { Input, Button, TextArea, Select } from '../../../components';
import { Fragment } from "react"
import { useForm, useController } from 'react-hook-form';
import { formConfigs } from '../constants/formConfigs';
import { get } from 'lodash';

const SubscribeForm = () => {
  const { register, handleSubmit } = useForm();

  const customSubmit = (data) => {
    const dataset = {
      email: data[formConfigs.fields.emailField],
    }
    console.log('dataset', dataset)
  }

  return (
    <Fragment>
      <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24 lg:flex lg:items-center lg:justify-between">
        <div>
          <h3 className="text-sm font-semibold leading-6 text-gray-900">Subscribe to our newsletter</h3>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>
        </div>
        <form className="mt-6 sm:flex sm:max-w-md lg:mt-0" onSubmit={handleSubmit(customSubmit)}>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            type="email"
            name={formConfigs.fields.emailField}
            autoComplete="email"
            required
            className="w-full min-w-0 appearance-none rounded-md border-0 bg-white px-3 py-1.5 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:w-56 sm:text-sm sm:leading-6"
            placeholder="Enter your email"
            {...register(formConfigs.fields.emailField)}
          />
          <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  )
}

export default SubscribeForm;