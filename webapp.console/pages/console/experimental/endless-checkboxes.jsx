import { supabase } from '9mbs/supabase.config';
import { useState, useEffect } from 'react';
import { ConsoleLayout } from '../../../components/ConsoleLayout';
import { FullNavigation, navigation } from '../../../components/AppNavigation';
import React from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

const checkboxes = {
  'something': false,
  'something2': false,
  'something3': false,
  'something4': false,
  //...
};


const EndlessCheckboxes = () => {
  const { control, handleSubmit, watch, setValue } = useForm({
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  const watchAllFields = watch();
  const watchCheckAll = watch('checkAll');

  useEffect(() => {
    console.log('watchCheckAll', { watchCheckAll, watchAllFields })
    if (watchCheckAll) {
      Object.keys(checkboxes).forEach((key) => {
        setValue(key, true);
      });
    }
  }, [watchAllFields, watchCheckAll]);

  // const handleCheckAll = (event) => {
  //   const checkAllValue = event.target.checked;
  //   Object.keys(checkboxes).forEach((key) => {
  //     setValue(key, checkAllValue);
  //   });
  // };

  return (
    <>
      <DevTool control={control} placement="top-left" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-2xl font-semibold">Endless Checkboxes</h1>
        <div>
          <label>
            <Controller
              name={'checkAll'}
              control={control}
              defaultValue={watch('checkAll')}
              onChange={([event]) => {
                console.log('event', event);
                return event.target.checked;
              }}
              render={({ field, formState }) => (
                <>
                  {console.log('field', formState, field)}
                  <input type="checkbox" {...field} />
                </>
              )}
            />
            Check All
          </label>
        </div>
        {Object.entries(checkboxes).map(([key, value]) => (
          <div key={key}>
            <Controller
              name={key}
              control={control}
              defaultValue={value}
              render={({ field }) => (
                <input type="checkbox" {...field} />
              )}
            />
            <label>{key}</label>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

const Page = ({ primaryTitle, secondaryTitle }) => {
  return (
    <ConsoleLayout
      primaryTitle={primaryTitle}
      secondaryTitle={secondaryTitle}
      navigation={navigation}
      primary={() => (
        <FormProvider>
          <EndlessCheckboxes />
        </FormProvider>
      )}
      breadcrumbs={[
        { name: 'Experimental', href: '/experimental', current: false },
        { name: 'Endless Checkboxes', href: '/experimental/endless-checkboxes', current: true }
      ]}
    />
  )
}

export { getServerSideProps } from '../../../ssp/console/hosting/hosting__home';
export default Page;