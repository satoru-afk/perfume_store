import type { Metadata } from 'next'
import { Itim, Caveat } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CartProvider } from '@/context/CartContext'
import { Toaster } from "@/components/ui/sonner";


const itim = Itim({ subsets: ['latin'], weight: '400' })
const caveat = Caveat({ subsets: ['latin'], variable: '--font-caveat' })

export const metadata: Metadata = {
  title: 'The Little Scent',
  description: 'Whimsical perfumes inspired by The Little Prince',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${itim.className} ${caveat.variable} bg-rose-50 text-slate-800`}>
      <CartProvider>
       
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <Toaster />
         
        </CartProvider>
      </body>
    </html>
  )
}