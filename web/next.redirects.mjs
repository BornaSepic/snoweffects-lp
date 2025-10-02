/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/**
 * @type {import('next').NextConfig['redirects']}
 **/
export const redirects = async () => {
  return [
    {
      source: '/projects/:path*',
      destination: '/articles/:path*',
      permanent: true
    },
    {
      source: '/services',
      destination: '/',
      permanent: false
    }
  ]
}
