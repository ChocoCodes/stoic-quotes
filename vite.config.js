import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/stoic-quote': {
        target: 'https://stoic.tekloon.net',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
