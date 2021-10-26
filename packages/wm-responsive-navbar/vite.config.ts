import { defineConfig } from "vite";
// import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: "src/wm-responsive-navbar.ts",
      formats: ["es"],
    },
    rollupOptions: {
      // external: /^lit/
    },
  },
  plugins: [
    replace({ "Reflect.decorate": "undefined", preventAssignment: true }),
    resolve(),
  ],
});
