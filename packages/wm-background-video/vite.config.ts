import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/wm-background-video.ts',
      formats: ['es'],
    },
    rollupOptions: {
      external: /^lit/,
    },
  },
});
