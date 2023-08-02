import { ConsoleLayout } from '../../../components/ConsoleLayout';
import { navigation } from '../../../components/AppNavigation';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';


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

const FormControlLabel = ({ control, label }) => {
  return (
    <label>
      {control}
      {label}
    </label>
  );
};

const checkboxOptions = [
  "all",
  "ID-123",
  "ID-124",
  "ID-125",
  "ID-126",
  "ID-127",
  "ID-128",
  "ID-129",
  "ID-130",
  "ID-131",
  "ID-132",
];

const Primary = () => {
  const { handleSubmit, control } = useForm();
  const onSubmit = (data) => console.log("SUBMIT: ", data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="checkboxes"
        defaultValue={[]}
        render={({ field }) => {
          const handleAllOptionChange = (checked, field) => {
            if (checked) {
              field.onChange(checkboxOptions);
            } else {
              field.onChange([]);
            }
          };

          const handleSingleOptionChange = (event, field) => {
            const { value, checked } = event.target;
            let newFieldValue = checked
              ? [...field.value, value]
              : field.value.filter((v) => v !== value);

            // If every other checkbox except the 'all' checkbox is checked, include 'all'.
            if (newFieldValue.includes('all')) {
              newFieldValue = newFieldValue.filter((v) => v !== 'all');
            }

            if (newFieldValue.length === checkboxOptions.length - 1) {
              newFieldValue = [...newFieldValue, 'all'];
            }

            field.onChange(newFieldValue);
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
                {checkboxOptions.map((checkboxOption) => (
                  <FormControlLabel
                    key={checkboxOption}
                    control={
                      <Checkbox
                        checked={field.value && field.value.some(
                          (value) => checkboxOption === value
                        )}
                        onChange={onChange}
                        value={checkboxOption}
                        name={checkboxOption}
                      />
                    }
                    label={checkboxOption}
                  />
                ))}
              </div>
            </div>
          );
        }}
      />
      <button type="submit">Submit</button>
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