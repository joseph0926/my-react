import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  esbuild: {
    jsxFactory: "createElement",
    jsxFragment: "Fragment",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
