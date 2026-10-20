import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Static-host friendly: clean URLs are produced by the SPA fallback documented
// in README.md (Netlify _redirects / Vercel rewrites / any host 404 fallback).
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    cssMinify: true,
    sourcemap: false,
  },
})
