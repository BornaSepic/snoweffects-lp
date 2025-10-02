'use strict'

const isPnpm = process.env.npm_config_user_agent.startsWith('pnpm/')

if (isPnpm === false) {
  // eslint-disable-next-line no-console
  console.error(
    'Use `pnpm install` to install dependencies in this repository\n'
  )
  process.exit(1)
}
