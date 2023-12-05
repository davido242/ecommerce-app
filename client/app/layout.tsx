"use client"
import '@/app/styles/globals.css';
import { Inter } from 'next/font/google';
import Header from './components/Header';
import Footer from './components/Footer';
import {  useState } from 'react';
import { NameContext } from './AuthContext/NameContext';

const inter = Inter({ subsets: ['latin'] });

const metadata = {
  title: 'My First Ecommerce app with NextJs',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [name, setName] = useState("");

  return (
    <html lang="en">
      <body>
        <NameContext.Provider value={{name, setName}}>
          <Header />
          {children}
          <Footer />
        </NameContext.Provider>
        </body>
    </html>
  )
}