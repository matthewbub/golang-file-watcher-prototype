import { supabase } from '@/supabase.config';
import { useState, useEffect } from 'react';
import { ConsoleLayout } from '../../../components/ConsoleLayout';
import { FullNavigation, navigation } from '../../../components/AppNavigation';
import React from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

// Custom Checkbox component
const Checkbox = ({ checked, onChange, value, name }) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e)}
      value={value}
      name={name}
    />
  );
};

// Custom FormControlLabel component
const FormControlLabel = ({ control, label }) => {
  return (
    <label>
      {control}
      {label}
    </label>
  );
};

const listStatusOptions = ["all", "published", "draft", "expired", "deleted"];

const defaultValues = {
  listStatus: ["draft"],
};

const onSubmit = (data) => console.log("SUBMIT: ", data);

const Primary = () => {
  const { handleSubmit, control } = useForm({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="listStatus"
        render={({ field, fieldState }) => {
          const handleAllOptionChange = (checked, field) => {
            field.onChange(checked ? listStatusOptions : []);
          };

          const handleSingleOptionChange = (event, field) => {
            const { value, checked } = event.target;
            const newFieldValue = checked
              ? [...field.value, value]
              : field.value.filter((v) => v !== value);

            // Set to 'all' if all options are selected, otherwise update normally.
            field.onChange(
              newFieldValue.length === listStatusOptions.length - 1 ? listStatusOptions : newFieldValue
            );
          };

          const onChange = (event) => {
            const { value, checked } = event.target;

            if (value === "all") {
              handleAllOptionChange(checked, field);
            } else {
              handleSingleOptionChange(event, field);
            }
          };


          return (
            <div>
              <h2>Checkboxes</h2>
              <div className='flex flex-col'>
                {listStatusOptions.map((listStatusOption) => (
                  <FormControlLabel
                    key={listStatusOption}
                    control={
                      <Checkbox
                        checked={field.value.some(
                          (value) => listStatusOption === value
                        )}
                        onChange={onChange}
                        value={listStatusOption}
                        name={listStatusOption}
                      />
                    }
                    label={listStatusOption}
                  />
                ))}
              </div>
            </div>
          );
        }}
      />
    </form>
  );
}


const Page = ({ primaryTitle, secondaryTitle }) => {
  return (
    <ConsoleLayout
      primaryTitle={primaryTitle}
      secondaryTitle={secondaryTitle}
      navigation={navigation}
      primary={Primary}
      breadcrumbs={[
        { name: 'Experimental', href: '/experimental', current: false },
        { name: 'Endless Checkboxes', href: '/experimental/endless-checkboxes', current: true }
      ]}
    />
  )
}

export { getServerSideProps } from '../../../ssp/console/hosting/hosting__home';
export default Page;