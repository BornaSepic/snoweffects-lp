// @ts-check

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import { baseConfigs } from './devops/eslint/base-rules.mjs'

/** @type {import('typescript-eslint').ConfigArray} */
const config = tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strict,
  ...baseConfigs,
  {
    name: 'no-nagging',
    linterOptions: { reportUnusedDisableDirectives: 'off' }
  }
)

export default config
