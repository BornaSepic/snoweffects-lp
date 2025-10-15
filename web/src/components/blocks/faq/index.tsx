import { type FC } from 'react'
import style from './style.module.scss'
import { FAQQuestions } from './components/questions'

export type Props = {
  title: React.ReactNode
  questions: Array<{
    question: string
    answer: string | React.ReactNode
  }>
}

export const FAQ: FC<Props> = async ({
  title,
  questions
}) => {
  return (
    <section className={style.FAQ}>
      <h2 className={style.FAQ__title}>{title}</h2>
      <FAQQuestions questions={questions} />
    </section>
  )
}
