/// <reference types="vitest" />
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import path from 'node:path'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import 'dotenv/config'
import appManifest from './config/app-manifest'
import iconLoader from './utils/vite-icon-loader'
import fontLoader from './utils/vite-font-loader'
import fonts from './src/styles/google-fonts'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import mdx from '@mdx-js/rollup'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/components'),
      '@asset': path.resolve(__dirname, './src/assets'),
    },
  },
  plugins: [
    mdx({ remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex] }),
    react(),
    svgr(),
    fontLoader(fonts),
    iconLoader(),
    VitePWA({
      includeAssets: ['app-icons/favicon.svg'],
      registerType: 'autoUpdate',
      strategies: 'generateSW',
      manifest: appManifest,
      ...(process.env.SW_DEV === 'true'
        ? {
            devOptions: {
              enabled: true,
              type: 'module',
            },
          }
        : null),
    }),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './setupTests.ts',
    exclude: ['playwright/tests/**', '**/node_modules/**'],
  },
})
