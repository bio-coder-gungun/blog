import type { Metadata } from 'next'
import './globals.css'
import 'katex/dist/katex.min.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'bio-coder-gungun',
    template: '%s | bio-coder-gungun',
  },
  description:
    'A blog on mathematical intuition, translational biology, and tools in clinical research.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-gray-50 text-gray-900 font-sans min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
