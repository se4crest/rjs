import {defineConfig} from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: [
        "src/common.ts",
        "src/lib.ts"
      ],
      name: "rjs",
      fileName: (fmt, name) => fmt === "es" ? `${name}.js` : `${name}.umd.${fmt}`
    }
  },
  plugins: [
    dts({
      exclude: ["src/test.ts", "src/main.ts"]
    })
  ]
});