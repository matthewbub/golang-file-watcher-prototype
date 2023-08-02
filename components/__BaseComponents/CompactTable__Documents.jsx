export const Table = ({ data }) => {
  return (
    <table className="min-w-full divide-y divide-white/5">
      <thead>
        <tr>
          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">
            Title
          </th>
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
            Created By
          </th>
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
            Date Created
          </th>
          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
            <span className="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-white/5">
        {data && data.length > 0 && data.map((document) => (
          <tr key={document.id}>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-100/80 sm:pl-0">
              {document.document_title || 'Untitled Document'}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300/70">
              {document.document_owner}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300/70">
              {document.created_at}
            </td>
            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
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