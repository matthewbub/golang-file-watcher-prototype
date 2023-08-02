import { sanitize } from "isomorphic-dompurify";

export default function DataDisplay({ data }) {
  return (
    <div>

      <dl className="divide-y divide-white/10">
        <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt className="text-sm font-medium leading-6 text-white">Advertiser Category</dt>
          <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">{data.advertiser_category}</dd>
        </div>
        <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt className="text-sm font-medium leading-6 text-white">Description</dt>
          <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
            <div dangerouslySetInnerHTML={{ __html: sanitize(data.description) }} />
          </dd>
        </div>
      </dl>

    </div>
  )
}
