// @ts-check

// @ts-expect-error Next plugin doesn't have a d.ts file
import { flatConfig as nextPlugin } from '@next/eslint-plugin-next'
import reactPlugin from 'eslint-plugin-react'
import * as reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { restrictedGlobals } from './restricted-globals.mjs'

/** @type {import('typescript-eslint').ConfigArray} */
export const baseConfigs = tseslint.config([
  {
    name: 'project-global-ignores',
    ignores: [
      '.next',
      'datocms/lib',
      'devops/lib',
      'lib',
      'lib-test',
      'public',
      'storybook-static',
      'tmp'
    ]
  },
  reactPlugin.configs.flat.recommended || {},
  reactPlugin.configs.flat['jsx-runtime'] || {},
  reactHooks.configs['recommended-latest'],
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  nextPlugin.recommended,
  {
    settings: {
      react: {
        version: '18'
      }
    }
  },
  {
    name: 'project-base',
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    languageOptions: {
      ...reactPlugin.configs.flat.recommended?.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser
      }
    },
    rules: {
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          minimumDescriptionLength: 4,
          'ts-check': false,
          'ts-expect-error': 'allow-with-description',
          'ts-ignore': true,
          'ts-nocheck': true
        }
      ],
      '@typescript-eslint/consistent-type-assertions': [
        'error',
        { assertionStyle: 'never' }
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/explicit-module-boundary-types': ['off'],
      '@typescript-eslint/no-explicit-any': ['error'],
      '@typescript-eslint/no-inferrable-types': ['off'],
      '@typescript-eslint/no-invalid-void-type': [
        'error',
        { allowAsThisParameter: true }
      ],
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/no-use-before-define': ['error'],
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': ['off'],
      curly: ['error'],
      eqeqeq: ['error', 'smart'],
      'func-style': ['error', 'expression'],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-irregular-whitespace': ['error', { skipTemplates: true }],
      'no-restricted-globals': ['error', ...restrictedGlobals],
      'no-restricted-imports': [
        'error',
        {
          paths: [
            { message: "Please use 'remeda' instead.", name: 'lodash' },
            { message: "Please use 'remeda' instead.", name: 'lodash-es' },
            {
              importNames: ['any'],
              message: "Please use 'unknown()' instead.",
              name: 'superstruct'
            }
          ],
          patterns: [
            { group: ['lodash/*'], message: "Please use 'remeda' instead." }
          ]
        }
      ],
      'no-restricted-properties': [
        'error',
        {
          message: 'Please use `z.unknown()` instead.',
          object: 'z',
          property: 'any'
        }
      ],
      'no-restricted-syntax': [
        'error',
        {
          selector:
            'CallExpression[callee.type="MemberExpression"][callee.property.name="querySelector"][typeArguments]',
          message:
            'The querySelector<T> expression is a type assertion in disguse. Please use `core/dom/traversal` instead'
        },
        {
          selector:
            'CallExpression[callee.type="MemberExpression"][callee.property.name="querySelectorAll"][typeArguments]',
          message:
            'The querySelectorAll<T> expression is a type assertion in disguse. Please use `core/dom/traversal` instead'
        }
      ],
      'no-shadow': ['error', { allow: ['cb'] }],
      'no-unused-expressions': ['off'],
      'no-unused-vars': ['off'],
      'no-use-before-define': ['off'],
      'one-var': ['error', 'never'],
      'prefer-promise-reject-errors': ['off'],
      'react-hooks/exhaustive-deps': ['error'],
      'react/prop-types': ['off']
    }
  },
  {
    name: 'project-devops-cjs',
    files: [
      'graphql.config.js',
      '*.config.mjs',
      '*.config.cjs',
      '.pnpmfile.cjs',
      'bin/**/*.cjs',
      'devops/**/*.cjs',
      'gulpfile.js'
    ],
    languageOptions: {
      globals: {
        ...globals.node
      }
    },
    rules: {
      '@typescript-eslint/no-require-imports': ['off'],
      '@typescript-eslint/no-unsafe-call': ['off'],
      '@typescript-eslint/no-unsafe-member-access': ['off'],
      '@typescript-eslint/no-unsafe-return': ['off']
    }
  },
  {
    name: 'dato-migrations',
    files: ['datocms/src/migrations/**/*.ts'],
    rules: {
      'no-console': ['off']
    }
  }
])
