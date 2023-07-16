'use client'

import { RootLayout } from '@/components/RootLayout'
import '../i18n';
import '@/styles/tailwind.css'

export default function Layout({ children }) {
  return (
    <html lang="en" className="h-full bg-neutral-950 text-base antialiased">
      <body className="flex min-h-full flex-col">
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  )
}
