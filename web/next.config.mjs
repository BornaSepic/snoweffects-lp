// @ts-check

import Path from 'node:path'
import makeWithBundleAnalyzer from '@next/bundle-analyzer'
import { redirects } from './next.redirects.mjs'

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  devIndicators: false,
  compiler: {
    removeConsole: false
  },
  images: {
    disableStaticImages: true,
    domains: ['www.datocms-assets.com', 'image.mux.com'],
    imageSizes: [
      360, 480, 560, 640, 768, 860, 940, 1024, 1280, 1366, 1440, 1600, 1920,
      2560, 3840
    ],
    minimumCacheTTL: 60 * 60 * 24,
    formats: ['image/webp', 'image/avif']
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en'
  },
  poweredByHeader: false,
  reactStrictMode: true,
  redirects: redirects,
  rewrites: async () => {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: []
    }
  },
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
    includePaths: [Path.resolve(import.meta.dirname, './src/core/styles')]
  },
  typescript: {
    ignoreBuildErrors: true
  }
}

const withBundleAnalyzer = makeWithBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false
})

export default withBundleAnalyzer(nextConfig)
