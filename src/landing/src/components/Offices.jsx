import clsx from 'clsx'

function Office({ name, children, invert = false }) {
  return (
    <address
      className={clsx(
        'text-sm not-italic',
        invert ? 'text-neutral-300' : 'text-neutral-600'
      )}
    >
      <strong className={invert ? 'text-white' : 'text-neutral-950'}>
        {name}
      </strong>
      <br />
      {children}
    </address>
  )
}

export function Offices({ invert = false, ...props }) {
  return (
    <ul role="list" {...props}>
      <li>
        <Office name="Redlands" invert={invert}>
          NineMbs Studio LLC
          <br />
          1752 E. Lugonia Ave,
          <br />
          Ste 117 - 1096,
          <br />
          Redlands, CA 92373
          <br />
          United States

        </Office>
      </li>
    </ul>
  )
}
