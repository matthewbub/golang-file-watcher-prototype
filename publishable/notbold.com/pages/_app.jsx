import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Inter, Roboto_Slab } from 'next/font/google'
import '../styles/reset.css'

const inter = Inter({
  weight: ['400', '700'],
  style: 'normal',
  subsets: ['latin']
})

const robotoSlab = Roboto_Slab({
  weight: ['400', '700'],
  style: 'normal',
  subsets: ['latin']
})

export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }
        html {
          font-family: ${inter.style.fontFamily};
        }
        h1, h2, h3, h4, h5, h6 {
          font-family: ${robotoSlab.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}