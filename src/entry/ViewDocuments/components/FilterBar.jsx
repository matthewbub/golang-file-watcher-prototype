import React, { useEffect } from 'react';
import { Input, Select } from '../../../components';
import { useForm, useController } from 'react-hook-form';
import { useFilterBar } from '../state';

const FilterBar = () => {
  const { control, watch } = useForm();

  const setSearch = useFilterBar(state => state.setSearchValue);
  const setCategory = useFilterBar(state => state.setCategoryValue);
  const setDate = useFilterBar(state => state.setDateValue);

  const watchSearch = watch('search');
  const watchCategory = watch('category');
  const watchDate = watch('date');

  const clearStateJustToBeSure = () => {
    setSearch('');
    setCategory('');
    setDate('');
  }

  useEffect(() => {
    clearStateJustToBeSure();
  }, []);

  useEffect(() => {
    setSearch(watchSearch);
    setCategory(watchCategory);
    setDate(watchDate);
  }, [watchSearch, watchCategory, watchDate]);

  const { field: searchInput } = useController({
    name: 'search',
    control,
    defaultValue: '',
  });

  const { field: categorySelect } = useController({
    name: 'category',
    control,
    defaultValue: '',
  });

  const { field: dateSelect } = useController({
    name: 'date',
    control,
    defaultValue: '',
  });

  return (
    <form className='w-full container-padding grid grid-cols-12 gap-2 bg1 border-t border-white/20'>
      <div className='col-span-12'>
        <Input
          label='Search documents'
          placeholder='Search'
          {...searchInput}
        />
      </div>
      <div className='col-span-3'>
        <Select
          label='Filter by category'
          options={[
            { id: 'all', name: 'All' },
            { id: 'document', name: 'Document' },
            { id: 'client', name: 'Client' },
            { id: 'date', name: 'Date' },
          ]}
          {...categorySelect}
        />
      </div>
      <div className='col-span-3'>
        <Select
          label='Filter by date'
          options={[
            { id: 'date-created-asc', name: 'Created (Asc)' },
            { id: 'date-created-desc', name: 'Created (Desc)' },
            { id: 'date-modified-asc', name: 'Modified (Asc)' },
            { id: 'date-modified-desc', name: 'Modified (Desc)' },
          ]}
          {...dateSelect}
        />
      </div>
    </form>
  )
}

export default FilterBar;