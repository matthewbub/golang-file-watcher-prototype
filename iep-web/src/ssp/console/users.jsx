import { supabase } from '../../connections';
import { sspWithAuth } from "../../helpers";

export const getServerSideProps = sspWithAuth(async (context) => {
  const { data, error } = await supabase.from('users').select('created_at, email, id, phone');

  if (error) {
    console.error(error);
    return {
      props: {
        primaryTitle: 'Users',
        secondaryTitle: 'Recent actions',
        data: [],
        addUserForm: null
      }
    }
  }

  return {
    props: {
      primaryTitle: 'Users',
      secondaryTitle: 'Recent actions',
      data: data,
      form: {
        formTitle: 'Create a new user',
        formDescription: 'Create a new user to access the console',
        fields: [
          {
            label: 'Email',
            name: 'email',
            type: 'text',
            className: 'col-span-12',
            field: 'Input'
          },
          {
            label: 'Password',
            name: 'password',
            type: 'password',
            className: 'col-span-9',
            field: 'Input'
          },
          {
            label: 'Confirm Password',
            name: 'confirm-password',
            type: 'password',
            className: 'col-span-9',
            field: 'Input'
          },
          {
            label: 'Role',
            name: 'auth_type',
            type: 'select',
            className: 'col-span-9',
            options: [
              { id: 'iep', name: 'IEP Client' },
              { id: 'tenant', name: 'Tenant' },
              { id: 'console', name: 'Console User' }
            ],
            field: 'Select'
          },
          {
            label: 'Phone',
            name: 'phone',
            type: 'text',
            className: 'col-span-9',
            field: 'Input',
          },
          {
            label: 'Create User',
            name: 'submit',
            type: 'submit',
            className: 'col-span-4',
            field: 'SubmitButton'
          }
        ]
      }
    }
  }
})