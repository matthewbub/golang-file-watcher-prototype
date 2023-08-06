import { supabase } from '../../../connections';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { SlideOver } from '../../../components/SlideOver';
import Input from '../../../components/Input';
import { Button } from '../../../components';
import { ConsoleLayout } from '../../../components/ConsoleLayout';

const TenantsPage = ({ title, tenants }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm();

  async function submitForm(data) {
    const { error } = await supabase
      .from('tenants')
      .insert([{ tenant_name: data.tenant_name }]);

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
    <ConsoleLayout
      primaryTitle={title}
      primary={() => (
        <div>
          <div className='flex justify-between w-full'>
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
      )}
      breadcrumbs={[
        { name: 'Hosting', href: '/hosting', current: false },
        { name: 'Tenants', href: '/hosting/tenants', current: true },
      ]}
    />
  )
}

export { getServerSideProps } from '../../../ssp/console/hosting/hosting__tenants';
export default TenantsPage;