import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: "src/wm-dnn-carousel.ts",
      formats: ["es"],
    },
    // rollupOptions: {
    //   external: /^lit/,

    // },
  },
});
