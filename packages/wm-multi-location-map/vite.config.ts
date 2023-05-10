import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/multi-location-map.ts',
      formats: ['es'],
    },
    rollupOptions: {
      // external: /^lit/,
      // treeshake: false,
    },
  },
  server: {
    port: 3000,
  },
  base: './',
  // plugins: [
  //   replace({ "Reflect.decorate": "undefined", preventAssignment: true }),
  //   resolve(),
  // ],
});
