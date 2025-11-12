import clsx from 'clsx'
import style from './style.module.scss'

export type Props = {
  label: string | React.ReactNode
  link?: string
  onClick?: () => void
  className?: string
  mode?: 'primary' | 'secondary'
  id?: string
}

export const Cta = ({ label, link, onClick, mode = 'primary', className, id }: Props) => {
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
      <a id={id} href={link} className={clsx(style.Cta, style[`Cta--${mode}`], className)}>
        {directionalLabelHelpers}
        {label}
        {directionalLabelContent}
      </a>
    )
  }

  return (
    <button
      id={id}
      type="button"
      className={clsx(style.Cta, style[`Cta--${mode}`], className)}
      onClick={onClick}
    >
      {directionalLabelHelpers}
      {label}
      {directionalLabelContent}
    </button>
  )
}
