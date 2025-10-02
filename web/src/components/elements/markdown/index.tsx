import MdToJSX, { type MarkdownToJSX } from 'markdown-to-jsx'
import { type FC, Fragment, type ReactNode } from 'react'
import { kebabCase } from '../../../core/string/kebab-case'

export const Noop: FC = () => null

export type Props = {
  children: string
  overrides?: NonNullable<MarkdownToJSX.Options['overrides']>
}

/**
 * Ensures bot ATX and CTX headings render anchor IDs
 *
 * Example CTX heading:
 *
 * My Heading
 * ----------
 *
 * Example ATX heading:
 *
 * ## My Heading
 */
export const Heading: FC<{ children: ReactNode; __headingLevel?: number }> = ({
  children,
  __headingLevel,
  ...props
}) => {
  const text: string | null =
    children == null
      ? null
      : typeof children === 'string'
        ? children
        : Array.isArray(children)
          ? children
              .flatMap((c) => {
                return typeof c === 'string' && c.length ? [c] : []
              })
              .join(' ')
          : null

  const id = text != null && text.length ? kebabCase(text) : undefined

  if (__headingLevel === 1) {
    return (
      <h1 {...props} id={id}>
        {children}
      </h1>
    )
  }

  return (
    <h2 {...props} id={id}>
      {children}
    </h2>
  )
}

export const Markdown: FC<Props> = ({
  children,
  overrides: customOverrides
}) => {
  const baseOptions: MarkdownToJSX.Options = {
    forceBlock: true,
    disableParsingRawHTML: true,
    wrapper: Fragment
  }

  /**
   * Avoid rendering images in minimal mode
   */
  const options: MarkdownToJSX.Options = {
    ...baseOptions,
    overrides: {
      img: Noop,
      image: Noop,
      h1: {
        component: Heading,
        props: {
          __headingLevel: 1
        }
      },
      h2: {
        component: Heading,
        props: {
          __headingLevel: 2
        }
      },
      ...customOverrides
    }
  }

  return <MdToJSX options={options}>{children}</MdToJSX>
}
