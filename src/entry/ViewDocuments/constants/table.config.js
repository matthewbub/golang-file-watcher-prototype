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
  data: {
    1: [
      {
        mapToId: 1,
        title: 'Untitled Document',
      },
      {
        mapToId: 2,
        title: 'General',
      },
      {
        mapToId: 3,
        title: '12/12/2020',
      },
      {
        mapToId: 4,
        title: 'Edit',
      }
    ],
    2: [
      {
        mapToId: 1,
        title: 'Untitled Document',
      },
      {
        mapToId: 2,
        title: 'General',
      },
      {
        mapToId: 3,
        title: '12/12/2020',
      },
      {
        mapToId: 4,
        title: 'Edit',
      }
    ]
  }
}