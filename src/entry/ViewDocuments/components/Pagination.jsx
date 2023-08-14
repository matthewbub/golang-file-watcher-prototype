import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { get } from 'lodash'

export default function Pagination({
  nextUrl = '#',
  prevUrl = '#',
  nextDisabled = false,
  prevDisabled = true,
  counts = {
    total: 0,
    start: 0,
    end: 0,
  }
}) {
  const total = get(counts, 'total', 0)
  const start = get(counts, 'start', 0)
  const end = get(counts, 'end', 0)

  return (
    <div className="flex items-center justify-between border-t border-white/20 px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href={prevUrl}
          aria-disabled={prevDisabled}
          className={clsx(
            'relative inline-flex items-center',
            'rounded-md border border-white/20',
            'px-4 py-2 text-sm font-medium',
            'txt2 hover:bg-teal-600/10',
            prevDisabled && 'opacity-50 cursor-not-allowed pointer-events-none'
          )}
        >
          Previous
        </a>
        <a
          href={nextUrl}
          aria-disabled={nextDisabled}
          className={clsx(
            'ml-3',
            'relative inline-flex items-center',
            'rounded-md border border-white/20',
            'px-4 py-2 text-sm font-medium',
            'txt2 hover:bg-teal-600/10',
            nextDisabled && 'opacity-50 cursor-not-allowed pointer-events-none'
          )}
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm txt2">
            Showing {start} to {end} of {total} results
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <a
              href={prevUrl}
              aria-disabled={prevDisabled}
              className={clsx(
                'relative inline-flex items-center',
                'rounded-l-md px-2 py-2',
                'txt2 ring-1 ring-inset ring-white/20',
                'hover:bg-teal-600/10 focus:z-20 focus:outline-offset-0',
                prevDisabled && 'opacity-50 cursor-not-allowed pointer-events-none'
              )}
            >
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              <span className="text-sm">Previous</span>
            </a>
            <a
              href={nextUrl}
              aria-disabled={nextDisabled}
              className={clsx(
                'relative inline-flex items-center',
                'rounded-r-md px-2 py-2',
                'txt2 ring-1 ring-inset ring-white/20',
                'hover:bg-teal-600/10 focus:z-20 focus:outline-offset-0',
                nextDisabled && 'opacity-50 cursor-not-allowed pointer-events-none'
              )}
            >
              <span className="text-sm">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  )
}
