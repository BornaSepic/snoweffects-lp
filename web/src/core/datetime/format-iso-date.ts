import { isValid, parseISO } from 'date-fns'

export type MakeParams = {
  countryCode: string
  languageCode: string
}

export type FormatIsoDate = (input: string) => string

export const makeFormatIsoDate = ({
  countryCode,
  languageCode
}: MakeParams): FormatIsoDate => {
  const formatter = new Intl.DateTimeFormat(`${languageCode}-${countryCode}`, {
    dateStyle: 'short'
  })

  return function formatIsoDate(input) {
    const date = parseISO(input)

    if (isValid(date) === false) {
      throw new Error(
        'Date input is invalid [26f4112815cf4571ae8737e2aa549829]'
      )
    }

    return formatter.format(date)
  }
}
