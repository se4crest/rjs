import {defineConfig} from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: "src/lib.ts",
      name: "rjs",
      fileName: "index"
    }
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      exclude: ["src/test.ts", "src/main.ts"]
    })
  ]
});