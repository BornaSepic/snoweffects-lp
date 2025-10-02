import { type Metadata, type ResolvingMetadata } from 'next'
import { type ReactNode } from 'react'

export type PageProps = {
  params: Promise<Record<string, string>>
  searchParams: Promise<Record<string, string | string[]>>
}

export type Page = (props: PageProps) => Promise<ReactNode> | ReactNode

export type GenerateMetadata = (
  props: PageProps,
  parent: ResolvingMetadata
) => Promise<Metadata> | Metadata
