import { supabase } from '@/supabase.config';
import { sspWithAuth } from "@/helpers";

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
      primaryTitle: 'Messages',
      secondaryTitle: 'Recent actions',
      data: data,
      form: {
        formTitle: 'Create a new message',
        formDescription: 'Create a new message to send to users',
        formFields: [
          {
            label: 'Screen',
            name: 'screen',
            type: 'select',
            className: 'col-span-6',
            field: 'Select',
            options: [
              { id: 'landing', name: 'Landing' },
            ]
          },
          {
            label: 'Tenant',
            name: 'tenant',
            type: 'select',
            className: 'col-span-6',
            options: [
              { id: 'iep', name: 'IEP Client' },
              { id: 'tenant', name: 'Tenant' },
              { id: 'console', name: 'Console User' }
            ],
            field: 'Select'
          },
          {
            label: 'Message ID',
            name: 'message_id',
            type: 'text',
            className: 'col-span-12',
            field: 'Input'
          },
          {
            label: 'Message',
            name: 'message',
            type: 'text',
            className: 'col-span-12',
            field: 'Input'
          },
          {
            label: 'Submit',
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