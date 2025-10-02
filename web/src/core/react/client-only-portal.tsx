'use client'

import { type FC, type ReactNode, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export type Props = {
  children: ReactNode
  selector: string
}

export const ClientOnlyPortal: FC<Props> = ({ children, selector }) => {
  const ref = useRef<Element | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    ref.current = document.querySelector(selector)
    setMounted(true)
  }, [selector])

  return mounted && ref.current != null
    ? createPortal(children, ref.current)
    : null
}
