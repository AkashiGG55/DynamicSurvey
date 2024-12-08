import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'; // No need for external installation

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Maps '@' to './src'
    },
  },
})
