import React from 'react';
import { useRouter } from 'next/router';

import PathHandler from '@/helpers/PathHandler';

import { ConsoleLayout } from '@/components/ConsoleLayout';
import { navigation } from '@/components/AppNavigation';

import { Button } from '@/components';
import clsx from 'clsx';
import { baseClassNames } from '@/helpers/constants';
const pathHandler = new PathHandler('console');

const Lifecycle = ({ children }) => (
  <div>
    {children}
  </div>
);

const Table = ({ data }) => {
  return (
    <Lifecycle>
      <table className="w-full whitespace-nowrap text-left">
        <colgroup>
          <col className="w-full sm:w-5/12" />
          <col className="lg:w-4/12" />
          <col className="lg:w-2/12" />
          <col className="lg:w-1/12" />
        </colgroup>
        <thead className="border-b border-neutral-900 text-sm leading-6 text-white bg-neutral-900 sticky top-[63px]">
          <tr>
            <th scope="col" className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">
              Title
            </th>
            <th scope="col" className="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell">
              Created By
            </th>
            <th scope="col" className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20">
              Date Created
            </th>
            <th scope="col" className="hidden py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {data && data.length > 0 && data.map((document) => (
            <tr key={document.id}>
              <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                {document.document_title || 'Untitled Document'}
              </td>
              <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                {document.document_owner}
              </td>
              <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                {document.created_at}
              </td>
              <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-gray-400 md:table-cell lg:pr-20">
                <a href={"/documents/" + document.id} className="text-indigo-400 hover:text-indigo-600">
                  Edit<span className="sr-only">, {document.document_title}</span>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav
        className={clsx(
          "flex items-center justify-between border-t border-white/5 bg-neutral-900",
          baseClassNames.containerPadding
        )}
        aria-label="Pagination"
      >
        <div className="hidden sm:block">
          <p className="text-sm text-neutral-500">
            Showing <span className="font-medium text-neutral-300">1</span> to <span className="font-medium text-neutral-300">10</span> of{' '}
            <span className="font-medium text-neutral-300">20</span> results
          </p>
        </div>
        <div className="flex flex-1 justify-between sm:justify-end space-x-4">
          <Button disabled>{'Previous'}</Button>
          <Button>{'Next'}</Button>
        </div>
      </nav>
    </ Lifecycle>
  )
}

const Primary = ({ data }) => (
  <Table data={data} />
);

const PrimaryAction = () => {
  const router = useRouter();
  const handleClick = async () => {
    const response = await fetch('/api/v1/secure/create-document')
    const data = await response.json();

    // TODO - handle error
    router.push('/documents/' + data.redirectId);
  }

  return (
    <Button onClick={handleClick}>
      {'Create new document'}
    </Button>
  )
}

const Page = ({ primaryTitle, secondaryTitle, data }) => (
  <ConsoleLayout
    primaryTitle={primaryTitle}
    secondaryTitle={secondaryTitle}
    navigation={navigation}
    primary={() => <Primary data={data} />}
    primaryAction={PrimaryAction}
    breadcrumbs={[
      {
        name: 'Documents',
        href: pathHandler.getPath('documents'),
        current: true
      },
    ]}
  />
)

export { getServerSideProps } from '@/ssp/console/documents/index';
export default Page;
