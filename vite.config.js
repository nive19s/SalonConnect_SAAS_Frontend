import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
  build: {
    target: 'es2019',
    sourcemap: false,
    rollupOptions: {
      output: {
        // Long-lived vendor chunks cache well between deploys.
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          gsap: ['gsap'],
        },
      },
    },
  },
});
