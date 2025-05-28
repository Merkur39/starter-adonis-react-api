import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, '../shared/src'),
      '#assets': path.resolve(__dirname, 'src/assets'),
      '#components': path.resolve(__dirname, 'src/components'),
      '#contexts': path.resolve(__dirname, 'src/contexts'),
      '#hooks': path.resolve(__dirname, 'src/hooks'),
      '#guards': path.resolve(__dirname, 'src/guards'),
      '#pages': path.resolve(__dirname, 'src/pages'),
      '#router': path.resolve(__dirname, 'src/router'),
      '#services': path.resolve(__dirname, 'src/services'),
      '#store': path.resolve(__dirname, 'src/store'),
      '#styles': path.resolve(__dirname, 'src/styles'),
      '#types': path.resolve(__dirname, 'src/types'),
      '#utils': path.resolve(__dirname, 'src/utils'),
    },
  },
})
