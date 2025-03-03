import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    include: ["src/__test__/**/*.test.{ts,tsx}"],
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
