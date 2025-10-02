import Hls, { type HlsConfig } from 'hls.js'

export const baseConfig = {
  enableWorker: true,
  startFragPrefetch: true,
  workerPath: '/assets/js/hls.worker.js'
} satisfies Partial<HlsConfig>

export { Hls }
