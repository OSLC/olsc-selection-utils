import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  server: {
    port: 8080,
    open: true
  },
  optimizeDeps: {
    include: ['@oslc/oslc-selection-webcomponent']
  }
}) 