import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect } from 'react'
const inter = Inter({ subsets: ['latin'] })
import { useForm } from 'react-hook-form'
import logo from '../../public/light_logo_only.png'
export default function HomePage() {

  return (
    <div className="">
      <header>
        <img src={logo} />
      </header>
    </div>

  )
}
