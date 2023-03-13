import { join, parse, resolve } from "path";

export default {
  base: './',
  root: './',
  plugins: [],
  alias: {
    // "@": resolve(__dirname, './assets'), // will resolve to `/assets/`
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        backend: resolve(__dirname, "backend/index.html"),
        frontend: resolve(__dirname, "frontend/index.html")
      },
    },
  },
};

// function entryPoints(...paths) {
//   const entries = paths.map(parse).map(entry => {
//     const { dir, base, name, ext } = entry;
//     const key = join(dir, name);
//     const path = resolve(__dirname, dir, base);
//     return [key, path];
//   });

//   const config = Object.fromEntries(entries);
//   return config;
// }
