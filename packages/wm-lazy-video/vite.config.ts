import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/wm-lazy-video.ts',
      formats: ['es', 'cjs'],
    },
    // rollupOptions: {
    //   external: /^lit/,
    // },
  },
});
