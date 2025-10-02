import Path from 'node:path'
import { toKebabCase } from 'remeda'

const forbiddenSegments = ['client', 'server']

export const parseFilePath = (_path: string): string => {
  if (_path.length === 0) {
    throw new Error('Path is empty')
  }

  const path = Path.normalize(_path)

  if (path === '/') {
    return '/'
  }

  const _filename = Path.basename(path)

  const filename = _filename
    .split('.')
    .flatMap((segment, segmentIndex): string[] => {
      const isForbidden = forbiddenSegments.includes(toKebabCase(segment))

      return isForbidden === false
        ? [segment]
        : isForbidden && segmentIndex === 0
          ? [segment]
          : []
    })
    .join('.')

  return Path.join(Path.dirname(path), filename)
}
