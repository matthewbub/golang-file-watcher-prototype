import Link from 'next/link';
import { supabase } from '../../supabase.config';
import { useEffect } from 'react';
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Input from '../../components/Input';
import { useForm } from 'react-hook-form';
import { SlideOver } from '../../components/SlideOver';
import Button from '../../components/Button';

const TenantsPage = ({ title, tenants }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm();

  async function submitForm(data) {
    console.log(data);
    const { data: tenant, error } = await supabase
      .from('tenants')
      .insert([
        {
          tenant_name: data.tenant_name,
        }
      ]);

    if (error) {
      console.log(error);
      setError(error);
      return;
    }

    setOpen(false);

    window.location.reload();
  }

  useEffect(() => {
    const vercelToken = process.env.NEXT_PUBLIC_VERCEL_TOKEN;
    //Replace with your token
    const apiEndPt = 'https://api.vercel.com/v6/deployments?teamId=' + process.env.NEXT_PUBLIC_VERCEL_TEAM_ID;

    let config = {
      method: 'get',
      url: apiEndPt,
      headers: {
        Authorization: 'Bearer ' + vercelToken,
      },
    };

    fetch(config.url, config)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data);
      });
  }, [])

  return (
    <div className='mx-auto max-w-7xl p-12'>
      <a href='/' className="fixed left-0 top-0 flex w-fit justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        Console Home Page
      </a>

      <h1 className='text-4xl mb-12'>{title}</h1>

      <div className='flex justify-between w-full'>

        <h2 className='text-2xl mb-4'>All Tenants</h2>
        <button onClick={() => { setOpen(true) }}>Add new tenant</button>
      </div>
      <ul className='space-y-4 list-disc pl-6'>
        {tenants.map(tenant => (
          <li key={tenant.id}>
            <a href={tenant.tenant_name + '.localhost:3000'} className='text-blue-500 underline'>{tenant.tenant_name}</a>
          </li>
        ))}
      </ul>
      <SlideOver
        open={open}
        setOpen={setOpen}
        title='Add new tenant'
      >
        <form className='grid grid-cols-12 gap-5' onSubmit={handleSubmit(submitForm)}>
          <Input label='Tenant Name' name='tenant_name' register={register} className='col-span-12' />
          <Button className='col-span-4 text-center'>
            Add Tenant
          </Button>
        </form>


      </SlideOver>
    </div>
  )
}

export const getServerSideProps = async (context) => {

  const { data, error } = await supabase.from('tenants').select('*');

  if (error) {
    console.log(error);
  }

  return {
    props: {
      title: 'Tenants',
      tenants: data
    }
  }
}

export default TenantsPage;