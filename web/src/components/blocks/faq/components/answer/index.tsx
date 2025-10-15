'use client'

import React, { type FC } from 'react'
import style from '../../style.module.scss'

export type Props = {
  isExpanded: boolean
  answer: string | React.ReactNode
}

export const FAQAnswer: FC<Props> = ({ answer, isExpanded }) => {
  const answerRef = React.useRef<HTMLDivElement>(null)
  const [maxHeight, setMaxHeight] = React.useState<string | number>(0)

  React.useEffect(() => {
    if (answerRef.current) {
      setMaxHeight(answerRef.current.scrollHeight)
    }
  }, [answerRef.current?.scrollHeight])

  return (
    <div
      ref={answerRef}
      className={style.FAQ__answer__wrapper}
      style={{
        maxHeight: isExpanded ? maxHeight : 0
      }}
    >
      <p className={style.FAQ__answer}>{answer}</p>
    </div>
  )
}
