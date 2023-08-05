import { supabase } from '../../../supabase.config';
import jwt from 'jsonwebtoken';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.locale('en');
dayjs.extend(relativeTime);
import { sspWithAuth } from '@/helpers/sspWithAuth';
import { get } from 'lodash';

export const getServerSideProps = sspWithAuth(async (context) => {
  const { id } = get(context, 'params', {});
  const token = get(context, 'req.cookies.accessToken', null);
  const decodedToken = jwt.verify(token, process.env.SUPABASE_JWT);

  const { data, error } = await supabase
    .from('users')
    .select(`
      email,
      documents (
          *
      )
  `)
    .eq('email', decodedToken.email)
    .filter('documents.id', 'eq', id)
    .single();

  const { data: screenData, error: screenError } = await supabase
    .from('screens')
    .select(`*`)
    .eq('id', data.documents[0].screen || '')
    .single();


  // TODO - handle error

  if (error || screenError) {
    // console.error(error);
  }

  return {
    props: {
      primaryTitle: 'Documents',
      id: id,
      data: data,
      documentTitle: data.documents[0].document_title || 'Untitled Document',
      form: {
        formTitle: 'Modify Document',
        formDescription: 'Modify Document Description',
        formFields: [
          {
            label: 'Document Title',
            name: 'document_title',
            defaultValue: data.documents[0].document_title || 'Untitled Document',
            type: 'text',
            className: 'col-span-12',
            field: 'Input'
          },
          {
            label: 'Screen',
            name: 'screen',
            defaultValue: screenData ? screenData.screen_title : '',
            type: 'text',
            className: 'col-span-12',
            field: 'Input'
          },
          {
            label: 'Visibility',
            name: 'visibility',
            type: 'select',
            className: 'col-span-12',
            field: 'Select',
            defaultValue: data.documents[0].visibility || 'public',
            options: [
              {
                name: 'Public',
                value: 'public'
              },
              {
                name: 'Private',
                value: 'private'
              }
            ]
          },
          {
            field: 'Divider',
          },
          {
            label: 'Page Title (SEO)',
            name: 'page_title',
            defaultValue: data.documents[0].page_title || '',
            type: 'text',
            className: 'col-span-12',
            field: 'Input'
          },
          {
            label: 'Document Description (SEO)',
            name: 'document_description',
            defaultValue: data.documents[0].document_description || '',
            type: 'text',
            className: 'col-span-12',
            field: 'TextArea'
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
});
