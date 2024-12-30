// import { defineConfig } from "vite";
// import { visualizer } from "rollup-plugin-visualizer";

// export default defineConfig({
//   plugins: [visualizer()],
// });


import { defineConfig } from 'vite';

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
      ]
    }
  }
})
