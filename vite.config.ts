import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  base: '/bootrun-frontend/',
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
