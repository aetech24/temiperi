// import { defineConfig } from "vite";
// import { visualizer } from "rollup-plugin-visualizer";

// export default defineConfig({
//   plugins: [visualizer()],
// });


import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], // Group React libraries into a separate chunk
        },
      },
    },
    chunkSizeWarningLimit: 1000, // (Optional) Increase the warning limit
  },
});