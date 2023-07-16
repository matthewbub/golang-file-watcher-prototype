import Image from 'next/image'
import logo from '@/images/YucaipaLandscapingLogo.png';

export function Logo({
  className,
  invert = false,
  filled = false,
  fillOnHover = false,
  ...props
}) {
  return (
    <Image src={logo} alt='Studio' height={50} width={'100%'} />
  )
}
