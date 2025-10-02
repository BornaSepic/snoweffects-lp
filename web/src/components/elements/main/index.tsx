import type { FC } from 'react'
import { Footer } from '../../blocks/footer'

export type Props = {
  children: React.ReactNode
}

export const Main: FC<Props> = ({ children }) => {
  return (
    <>
      <main id="main-content">{children}</main>
      <Footer />
    </>
  )
}
