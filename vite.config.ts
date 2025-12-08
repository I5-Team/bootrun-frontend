import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr"
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  base: '/bootrun-frontend/',
  resolve: {
    alias: {
      // 절대경로 alias 설정: '@' -> './src'
      '@': path.resolve(__dirname, './src') 
    }
  },
  build:{
    rollupOptions:{
      output:{
        manualChunks(id){
          if(id.includes('node_modules')){
            if(id.includes('recharts')){
              return 'vendor_recharts';
            }

            return 'vendor';
          }
        }
      }
    }
  }
})
