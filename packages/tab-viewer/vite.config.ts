import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: "src/tab-viewer.ts",
      formats: ["es"],
    },
    // rollupOptions: {
    //   external: /^lit/,

    // },
  },
  server: {
    port: 3000,
  },
});
