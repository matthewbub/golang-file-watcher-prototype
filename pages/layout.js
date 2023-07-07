import JotaiProviders from '../config/jotai'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <JotaiProviders>
          {children}
        </JotaiProviders>
      </body>
    </html>
  )
}