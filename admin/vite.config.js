import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     "/temiperi": {
  //       target: "http://localhost:4000", // Backend URL
  //       changeOrigin: true,
  //     },
  //   },
  // },
});
