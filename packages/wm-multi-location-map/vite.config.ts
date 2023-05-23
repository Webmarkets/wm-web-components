import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/multi-location-map.ts',
      formats: ['es'],
    },
  },
  server: {
    port: 3000,
  },
});
