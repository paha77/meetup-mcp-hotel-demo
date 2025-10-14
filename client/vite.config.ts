import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
    'process.env': {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      LANGSMITH_API_KEY: process.env.LANGSMITH_API_KEY,
      LANGSMITH_TRACING: process.env.LANGSMITH_TRACING,
      LANGCHAIN_CALLBACKS_BACKGROUND:
        process.env.LANGCHAIN_CALLBACKS_BACKGROUND,
      LANGSMITH_ENDPOINT: process.env.LANGSMITH_ENDPOINT,
    },
  },
  resolve: {
    alias: {
      process: 'process/browser',
      buffer: 'buffer',
      util: 'util',
    },
  },
  optimizeDeps: {
    include: ['process', 'buffer', 'util'],
  },
});
