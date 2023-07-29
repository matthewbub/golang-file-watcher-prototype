import Link from 'next/link'
import clsx from 'clsx'

export const buttonBaseClasses = 'inline-flex rounded px-4 py-1.5 text-sm font-semibold transition'
export function Button({ invert, href, className, children, ...props }) {
  className = clsx(
    className,
    buttonBaseClasses,
    invert
      ? 'text-neutral-950'
      : 'bg-primary-500 text-white hover:bg-primary-600'
  )

  let inner = <span className="relative top-px">{children}</span>

  if (href) {
    return (
      <Link href={href} className={className} {...props}>
        {inner}
      </Link>
    )
  }

  return (
    <button className={className} {...props}>
      {inner}
    </button>
  )
}
