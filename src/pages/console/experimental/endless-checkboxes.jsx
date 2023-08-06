import React from 'react';
import { useForm, Controller } from 'react-hook-form';

import { ConsoleLayout } from '../../../src/components';
import { consoleNavigation as navigation } from '../../../src/console.navigation';

const Checkbox = ({ checked, onChange, value, name }) => {
  return (
    <div className='checkbox-wrapper'>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        value={value}
        name={name}
        style={{ display: 'none' }} // Hide the default input
      />
      <div className={`custom-checkbox${checked ? ' checked' : ''}`}>
        {/* Insert the custom SVG here */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="custom-svg"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
    </div>
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

const checkboxOptionsData = {
  "ID-123": {
    conditionA: true,
    conditionB: false,
  },
  "ID-124": {
    conditionA: false,
    conditionB: true,
  },
  "ID-125": {
    conditionA: false,
    conditionB: false,
  },
  "ID-126": {
    conditionA: true,
    conditionB: true,
  },
  "ID-127": {
    conditionA: false,
    conditionB: true,
  },
  "ID-128": {
    conditionA: true,
    conditionB: false,
  },
  "ID-129": {
    conditionA: false,
    conditionB: true,
  },
  "ID-130": {
    conditionA: true,
    conditionB: true,
  },
  "ID-131": {
    conditionA: true,
    conditionB: true,
  },
  "ID-132": {
    conditionA: false,
    conditionB: false,
  },
};

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
      <style jsx global>{`
        label {
          display: flex;
          align-items: center;
          margin: 10px 0;
        }

        .checkbox-wrapper {
          margin-right: 10px;
        }

        .custom-checkbox {
          display: inline-block;
          width: 24px;
          height: 24px;
          border: 2px solid #000; /* Customize border color */
          border-radius: 4px; /* Customize border radius */
          cursor: pointer;
        }
        
        .custom-checkbox.checked {
          background-color: #000; /* Customize checked background color */
        }
        
        .custom-svg {
          width: 100%;
          height: 100%;
          visibility: hidden;
        }
        
        input[type="checkbox"]:checked + .custom-checkbox .custom-svg {
          visibility: visible;
        }
      `}</style>
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