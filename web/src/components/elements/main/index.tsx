import type { FC } from 'react'
import { Footer } from '../../blocks/footer'
import style from './style.module.scss'

export type Props = {
  children: React.ReactNode
}

export const Main: FC<Props> = ({ children }) => {
  return (
    <>
      <main id="main-content" className={style.Main}>{children}</main>
      <Footer />
    </>
  )
}
