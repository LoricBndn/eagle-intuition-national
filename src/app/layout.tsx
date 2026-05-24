// app/layout.tsx (fichier serveur, PAS 'use client')

import type { Metadata } from 'next'
import '../styles/globals.css'
import LayoutClient from './layout.client'
import Script from 'next/script'

export const metadata: Metadata = {
  title: {
    default: 'Eagle Intuition',
    template: '%s | Eagle Intuition',
  },
  description: 'Eagle Intuition — formação e projetos Erasmus+ em Portugal.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? 'https://eagle-intuition.pt'),
  openGraph: {
    siteName: 'Eagle Intuition',
    locale: 'pt_PT',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body>
        <LayoutClient>{children}</LayoutClient>

        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-CLXCBLT3P5`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-CLXCBLT3P5', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </body>
    </html>
  )
}