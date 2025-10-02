import type {
  StructuredTextDocument,
  StructuredTextGraphQlResponse,
  StructuredTextGraphQlResponseRecord
} from 'react-datocms'

export const isStructuredTextDocument = (
  obj: unknown
): obj is StructuredTextDocument => {
  return (
    typeof obj === 'object' &&
    obj != null &&
    'schema' in obj &&
    obj.schema === 'dast' &&
    'document' in obj &&
    typeof obj.document === 'object' &&
    obj.document != null &&
    'type' in obj.document &&
    obj.document.type === 'root'
  )
}

export const parseStructuredText = <
  BlockRecord extends StructuredTextGraphQlResponseRecord,
  LinkRecord extends StructuredTextGraphQlResponseRecord = BlockRecord
>(input: {
  value: unknown
  blocks?: (BlockRecord | string)[]
  links?: (LinkRecord | string)[]
}):
  | {
      success: true
      data: StructuredTextGraphQlResponse<BlockRecord, LinkRecord>
    }
  | { success: false; error: Error } => {
  if (isStructuredTextDocument(input.value)) {
    const isBlockRecordItem = (
      item: BlockRecord | string
    ): item is BlockRecord => typeof item === 'object'

    const isLinkRecordItem = (item: LinkRecord | string): item is LinkRecord =>
      typeof item === 'object'

    const { blocks: _blocks = [], links: _links = [], value } = input

    const blocks = _blocks.filter(isBlockRecordItem)
    const links = _links.filter(isLinkRecordItem)

    return { success: true, data: { blocks, links, value } }
  }

  return {
    success: false,
    error: new Error('The value property is not a Structured Text document')
  }
}
