import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  root: 'demos/',
  build: {
    outDir: '../demos-build',
    manifest: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'demos/index.html'),
        WmModal: resolve(__dirname, 'demos/wm-modal/index.html'),
        WmBackgroundVideo: resolve(__dirname, 'demos/wm-background-video/index.html'),
      },
    },
  },
});