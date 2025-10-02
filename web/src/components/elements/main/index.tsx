import type { FC } from 'react'

export type Props = {
  children: React.ReactNode
}

export const Main: FC<Props> = ({ children }) => {
  return (
    <>
      <main id="main-content">{children}</main>
      <Footer colorScheme={'dark'} previousColorScheme={previousColorScheme} />
    </>
  )
}
