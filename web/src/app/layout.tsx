import type { Metadata, Viewport } from 'next'
import type { FC, ReactNode } from 'react'
import { WEBSITE_DESCRIPTION, WEBSITE_NAME } from '../core/seo'
import '../core/styles/main.scss'
import Providers from './providers'
import { DM_Sans, Playfair_Display } from 'next/font/google';
import { GoogleTagManager } from '@next/third-parties/google'

export const dm_sans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const playfair_display = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: WEBSITE_NAME,
  description: WEBSITE_DESCRIPTION
}

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width'
}

export type Props = {
  children: ReactNode
}

const RootLayout: FC<Props> = ({ children }) => {
  return (
    <html
      lang="en"
      className={`${dm_sans.variable} ${playfair_display.variable}`}
    >
      <GoogleTagManager gtmId="GTM-M8LZ35PX" />
      <GoogleTagManager gtmId="GTM-MJ2FWPV9" />

      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

export default RootLayout
