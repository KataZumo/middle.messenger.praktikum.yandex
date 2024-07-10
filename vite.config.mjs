import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  root: path.resolve(__dirname, "src"),
  plugins: [handlebars({
    partialDirectory: path.resolve(__dirname, "src/components"),
  })],
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "src/index.html")
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/assets/variables.scss";`
      }
    }
  },
  server: {
    middlewareMode: true
  }
});
