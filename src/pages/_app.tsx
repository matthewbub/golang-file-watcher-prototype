import React from 'react';
import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react';

import '../styles/globals.css'
import '../connections/i18n.config';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}
