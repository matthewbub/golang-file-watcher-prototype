import React from 'react';
import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react';

import '../styles/globals.css'
import '../i18n';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}
