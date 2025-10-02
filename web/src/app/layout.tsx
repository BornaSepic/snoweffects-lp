import type { Metadata, Viewport } from 'next'
import type { FC, ReactNode } from 'react'
import { WEBSITE_DESCRIPTION, WEBSITE_NAME } from '../core/seo'
import '../core/styles/main.scss'
import 'lenis/dist/lenis.css'
import Providers from './providers'

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
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

export default RootLayout
