import { join, parse, resolve } from "path";
import { VitePWA } from 'vite-plugin-pwa'

export default {
  base: './',
  root: './',
  // plugins: [
  //   VitePWA({
  //     registerType: 'autoUpdate',
  //     injectRegister: 'inline',
  //     strategies: 'injectManifest',
  //     srcDir: 'js',
  //     filename: 'service-worker.js',
  //     injectManifest: {
  //       injectionPoint: undefined
  //     },
  //     devOptions: {
  //       enabled: true
  //     },
  //     workbox: {
  //       clientsClaim: true,
  //       skipWaiting: true,
  //       sourcemap: true
  //     },
  //     manifest: {
  //       name: 'ROV Web',
  //       short_name: 'ROV Web',
  //       description: 'Internet ROV Piloting Website',
  //       theme_color: '#ffffff',
  //       icons: [
  //         {
  //           src: 'pwa-192x192.png',
  //           sizes: '192x192',
  //           type: 'image/png'
  //         },
  //         {
  //           src: 'pwa-512x512.png',
  //           sizes: '512x512',
  //           type: 'image/png'
  //         }
  //       ]
  //     }
  //   })
  // ],
  alias: {
    // "@": resolve(__dirname, './assets'), // will resolve to `/assets/`
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        backend: resolve(__dirname, "backend/index.html"),
        frontend: resolve(__dirname, "frontend/index.html"),
        offlineframe: resolve(__dirname, "offlineframe/index.html"),
        serviceworker: resolve(__dirname, "serviceworker.ts")
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
