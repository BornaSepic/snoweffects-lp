import Path from 'node:path'
import { toKebabCase, toSnakeCase } from 'remeda'

export const parseFolderPath = (_folderPath: string): string => {
  if (_folderPath.length === 0) {
    throw new Error('Folder name is empty')
  }

  const folderPath = Path.normalize(_folderPath)

  if (folderPath === '/') {
    return '/'
  }

  const hasLeadingSlash = folderPath.startsWith(Path.sep)
  const hasTrailingSlash = folderPath.endsWith(Path.sep)

  const segments = folderPath
    .split(Path.sep)
    .filter((segment) => segment.length > 0)
    .map((segment) => segment.trim())
    .flatMap((segment): string[] => {
      const [_basename, ...extnames] = segment.split('.')

      if (_basename == null) {
        return []
      }

      const isNextRouteGroup =
        _basename.startsWith('(') && _basename.endsWith(')')
      const isNextRouteParam =
        _basename.startsWith('[') && _basename.endsWith(']')

      const hasLeadingUndercore = _basename.startsWith('_')

      const basename =
        isNextRouteGroup || isNextRouteParam
          ? toSnakeCase(_basename)
          : hasLeadingUndercore
            ? ['_', toKebabCase(_basename)].join('')
            : toKebabCase(_basename)

      const basenameWithKeywords = basename.replace(
        /glo-2-facial/g,
        'glo2facial'
      )

      const extname =
        extnames.length > 0
          ? `.${extnames.map((ext) => toKebabCase(ext)).join('.')}`
          : ''

      return [[basenameWithKeywords, extname].join('')]
    })

  return [
    hasLeadingSlash ? '/' : '',
    segments.join('/'),
    hasTrailingSlash ? '/' : ''
  ].join('')
}
