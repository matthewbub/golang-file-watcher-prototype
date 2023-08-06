export const Table = ({ data }) => {
  return (
    <table className="w-full whitespace-nowrap text-left">
      <colgroup>
        <col className="w-full sm:w-5/12" />
        <col className="lg:w-4/12" />
        <col className="lg:w-2/12" />
        <col className="lg:w-1/12" />
      </colgroup>
      <thead className="border-b border-neutral-900 text-sm leading-6 txt1 bg-neutral-900 sticky top-[63px]">
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
  )
}
