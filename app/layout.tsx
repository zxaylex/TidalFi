import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TidalFi',
  description: 'Tokenize the Ocean\'s Sustainable Future',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
