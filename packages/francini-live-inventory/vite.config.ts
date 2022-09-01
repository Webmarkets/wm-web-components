import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/live-inventory.ts',
      formats: ['es'],
    },
    // rollupOptions: {
    //   external: /^lit/,
    // },
  },
});
