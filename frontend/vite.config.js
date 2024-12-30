import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: [
        'react-router-dom',
        'axios',
        'html2pdf.js',
        'react-phone-input-2',
        'react-toastify'
      ],
      output: {
        globals: {
          'react-router-dom': 'ReactRouterDOM',
          'axios': 'axios',
          'html2pdf.js': 'html2pdf',
          'react-phone-input-2': 'ReactPhoneInput',
          'react-toastify': 'ReactToastify'
        }
      }
    }
  },
})
