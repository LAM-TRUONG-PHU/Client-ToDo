import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, 
    proxy: { 
      '/api': {
        target: 'https://todoapi-uxe5.onrender.com/api/v2',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      
    } 
  },

})
