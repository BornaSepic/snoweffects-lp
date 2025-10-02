import crypto from 'crypto'

export type CreateHash = (input: string) => string

export const createHash: CreateHash = (input) => {
  if (!input) {
    throw new Error('Hash input is empty [38e9db68e8d54f3e8694e70bc1e4ab75]')
  }

  return crypto.createHash('sha256').update(input).digest('hex')
}
