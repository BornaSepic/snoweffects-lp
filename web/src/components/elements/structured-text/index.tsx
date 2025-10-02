import {
  type RenderRule,
  type TrasformFn,
  isLink
} from 'datocms-structured-text-utils'
import Link from 'next/link'
import type { ReactNode } from 'react'
import type {
  StructuredTextGraphQlResponseRecord,
  StructuredTextPropTypes
} from 'react-datocms'
import {
  StructuredText as DatoStructuredText,
  renderNodeRule
} from 'react-datocms'
import { Markdown } from '../markdown'
import { parseStructuredText } from './parse'

export type { StructuredTextGraphQlResponseRecord } from 'react-datocms'

export const baseCustomNodeRules = [
  renderNodeRule(isLink, ({ node, key, children }) => {
    return (
      <Link key={key} href={node.url}>
        {children}
      </Link>
    )
  })
] satisfies RenderRule<TrasformFn, TrasformFn, TrasformFn>[]

export type StructuredTextData<
  BlockRecord extends StructuredTextGraphQlResponseRecord = {
    __typename: string
    id: string
  },
  LinkRecord extends StructuredTextGraphQlResponseRecord = BlockRecord
> =
  | string
  | null
  | { value: unknown; blocks?: BlockRecord[]; links?: LinkRecord[] }

/**
 * A component that renders a Structured Text field. If data prop is a string,
 * it will be parsed and rendered as Markdown.
 *
 * **Don't use the original StructuredText component from react-datocms directly**.
 * Use this one because it handles some edge cases with the GraphQL API and
 * gracefully falls back to Markdown.
 *
 * Configure `customNodeRules` prop to customize the rendering of low-level nodes like anchor
 * links, paragraphs, or code blocks.
 *
 * Configure `renderBlock`/`renderInlineRecord`/`renderLinkToRecord` props to render custom CMS content.
 *
 * @see https://github.com/datocms/react-datocms/blob/master/docs/structured-text.md
 * @see https://www.datocms.com/docs/next-js/rendering-structured-text-fields
 */
export const StructuredText = <
  BlockRecord extends StructuredTextGraphQlResponseRecord,
  LinkRecord extends StructuredTextGraphQlResponseRecord = BlockRecord
>(
  props: {
    data:
      | {
          value: unknown
          blocks?: (BlockRecord | string)[]
          links?: (LinkRecord | string)[]
        }
      | string
      | null
  } & Omit<StructuredTextPropTypes<BlockRecord, LinkRecord>, 'data'>
): ReactNode => {
  const { data, customNodeRules = baseCustomNodeRules, ...params } = props

  if (data == null) {
    return null
  }

  if (typeof data === 'string') {
    return <Markdown>{data}</Markdown>
  }

  const result = parseStructuredText(data)

  if (result.success === false) {
    console.error(result.error)
    return null
  }

  return (
    <DatoStructuredText
      {...params}
      data={result.data}
      customNodeRules={customNodeRules}
    />
  )
}
