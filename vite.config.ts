import path from "path";
import { defineConfig } from "vite";
import babelPlugin from "vite-plugin-babel";

export default defineConfig({
  esbuild: {
    jsx: "preserve",
  },
  plugins: [
    babelPlugin({
      babelConfig: {
        presets: [
          ["@babel/preset-env", { targets: "defaults" }],
          [
            "@babel/preset-react",
            { pragma: "createElement", pragmaFrag: "Fragment" },
          ],
          "@babel/preset-typescript",
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
