import clsx from 'clsx'
import style from './style.module.scss'

export type Props = {
  label: string
  link?: string
  onClick?: () => void
  mode?: 'primary' | 'secondary'
}

export const Cta = ({ label, link, onClick, mode = 'primary' }: Props) => {
  const directionalLabelHelpers = (
    <>
      <span data-index="1" className={style.Cta__hoverHelper} />
      <span data-index="2" className={style.Cta__hoverHelper} />
      <span data-index="3" className={style.Cta__hoverHelper} />
      <span data-index="4" className={style.Cta__hoverHelper} />
    </>
  )

  const directionalLabelContent = (
    <>
      <span
        data-index="1"
        className={style.Cta__hoverContent}
        aria-hidden={true}
      >
        {label}
      </span>
      <span
        data-index="2"
        className={style.Cta__hoverContent}
        aria-hidden={true}
      >
        {label}
      </span>
      <span
        data-index="3"
        className={style.Cta__hoverContent}
        aria-hidden={true}
      >
        {label}
      </span>
      <span
        data-index="4"
        className={style.Cta__hoverContent}
        aria-hidden={true}
      >
        {label}
      </span>
    </>
  )

  if (link) {
    return (
      <a href={link} className={clsx(style.Cta, style[`Cta--${mode}`])}>
        {directionalLabelHelpers}
        {label}
        {directionalLabelContent}
      </a>
    )
  }

  return (
    <button
      type="button"
      className={clsx(style.Cta, style[`Cta--${mode}`])}
      onClick={onClick}
    >
      {directionalLabelHelpers}
      {label}
      {directionalLabelContent}
    </button>
  )
}
