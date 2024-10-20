import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import Head from "next/head";
import { Metadata } from 'next';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Folianator3000",
  description: "La Prof. Caproni ti ha datto da fare la foliazione ma non sai come fare? tranquillo qui ho ideato un algoritmo che lo farà al posto tuo, tanto fra 5 anni verremo sostituiti dall'IA ",
  authors: [{ name: 'Filippo Poma' }],
  openGraph: {
    title: 'Folianator3000',
    description: "La Prof. Caproni ti ha datto da fare la foliazione ma non sai come fare? tranquillo qui ho ideato un algoritmo che lo farà al posto tuo, tanto fra 5 anni verremo sostituiti dall'IA ",
    images: [
      {
        url: '/copertina.png', // Percorso relativo all'immagine
        width: 1200,
        height: 630,
        alt: "copertina di Folianator3000"
      },
    ],
    url: 'https://folianator3000.vercel.app/', // URL della tua app
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
   
    <html lang="en">
      <Head>
  
      </Head>
      <body className={inter.className}>{children}</body>
      <Analytics></Analytics>
    </html>
  );
}
