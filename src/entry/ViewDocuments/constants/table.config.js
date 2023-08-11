export const tableConfig = {
  colHeaders: [
    {
      id: 1,
      title: 'Document Name',
      colSpan: 'col-span-10 sm:col-span-7',
    },
    {
      id: 2,
      title: 'Category',
      colSpan: 'col-span-2',
      className: 'sm:flex hidden'
    },
    {
      id: 3,
      title: 'Date Created',
      colSpan: 'col-span-2',
      className: 'sm:flex hidden'
    },
    {
      id: 4,
      title: 'Edit',
      colSpan: 'col-span-1',
      className: 'sr-only',
    },
  ],
  data: [
    {
      1: 'Untitled Document',
      2: 'General',
      3: '12/12/2020',
      4: 'Edit',
    },
  ]
}