export const handleise = (string: string | null) => {
  if (!string) {
    return ''
  }

  return string
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
