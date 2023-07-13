import React, { useState, useEffect } from 'react';
import Input from './components/input';
import { useForm } from 'react-hook-form';
import Select from './components/Select';
import TextArea from './components/TextArea';
import Button from './components/Button';

const App = () => {
  const [locales, setLocales] = useState([]);
  const [newLocale, setNewLocale] = useState({});
  const [editedLocale, setEditedLocale] = useState({});
  const [deletedLocale, setDeletedLocale] = useState({});
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };


  useEffect(() => {
    fetchLocales();
  }, []);

  const fetchLocales = async () => {
    try {
      const response = await fetch('/api/v1/locales');
      const data = await response.json();
      setLocales(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createLocale = async () => {
    try {
      const response = await fetch('/api/v1/locales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLocale),
      });
      const data = await response.json();
      setLocales([...locales, data.data]);
      setNewLocale({});
    } catch (error) {
      console.error(error);
    }
  };

  const updateLocale = async (id) => {
    try {
      const response = await fetch(`/api/v1/locales/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedLocale),
      });
      const data = await response.json();
      const updatedLocales = locales.map((locale) =>
        locale.id === id ? data.data : locale
      );
      setLocales(updatedLocales);
      setEditedLocale({});
    } catch (error) {
      console.error(error);
    }
  };

  const deleteLocale = async (id) => {
    try {
      const response = await fetch(`/api/v1/locales/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      const filteredLocales = locales.filter((locale) => locale.id !== id);
      setLocales(filteredLocales);
      setDeletedLocale(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='w-full'>
      <div className='max-w-sm mx-auto'>
        <h1 className='text-2xl font-bold'>Locales</h1>
        <form
          className='pt-4 space-y-4 p-4 border shadow'
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className='text-lg font-semibold'>Create Locale</h2>
          <Select
            register={register}
            name={'locale'}
            label="Select Locale"
            placeholder="Locale"
            options={[
              { id: 'en', name: 'English' },
              { id: 'es', name: 'Spanish' },
              { id: 'fr', name: 'French' },
            ]}
          />
          <TextArea
            rows={3}
            register={register}
            name={'message'}
            placeholder="Message"
            label='Message'
          />
          <Input
            register={register}
            name={'message_key'}
            type="text"
            placeholder="Message Key"
            label='Message Key'
          />
          <Select
            register={register}
            name={'screen_id'}
            placeholder="Screen ID"
            label="Select Screen ID"
            options={[
              { id: '1', name: 'Login' },
              { id: '2', name: 'Home' },
              { id: '3', name: 'Profile' },
            ]}
          />

          <Button type="submit" className='mt-4'>
            Create Locale
          </Button>
        </form>
      </div>
    </div>
  );
};

export default App;
