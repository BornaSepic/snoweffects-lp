'use client'

import React, { type FC } from 'react'
import style from '../../style.module.scss'
import { MinusIcon } from '../../../../icons/minus'
import { PlusIcon } from '../../../../icons/plus'
import { FAQAnswer } from '../answer'

export type Props = {
  questions: Array<{
    question: string
    answer: string | React.ReactNode
  }>
}

export const FAQQuestions: FC<Props> = ({ questions }) => {
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null)


  return (
    <div className={style.FAQ__content}>
      {questions.map((q, index) => (
        <div className={style.FAQ__content__item} key={`faq-question-${index}`}>
          <button
            aria-expanded={expandedIndex === index ? 'true' : 'false'}
            className={style.FAQ__question}
            onClick={() =>
              setExpandedIndex(expandedIndex === index ? null : index)
            }
          >
            <span>{q.question}</span>
            {expandedIndex === index ? <MinusIcon /> : <PlusIcon />}
          </button>
          <FAQAnswer answer={q.answer} isExpanded={expandedIndex === index} />
        </div>
      ))}
    </div>
  )
}
