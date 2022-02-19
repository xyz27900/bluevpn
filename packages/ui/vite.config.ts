import fs from 'fs';
import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgrPlugin from 'vite-plugin-svgr';
import WindiCSS from 'vite-plugin-windicss';

const srcDir = path.resolve(__dirname, 'src');
const publicDir = path.resolve(__dirname, 'public');
const distDir = path.resolve(__dirname, 'dist');

fs.copyFileSync(path.resolve(srcDir, 'assets', 'logo-colored.svg'), path.resolve(publicDir, 'logo.svg'));

export default defineConfig({
  plugins: [
    react(),
    WindiCSS(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
      },
    }),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
  server: {
    port: 8088,
    proxy: {
      '^/api': {
        target: 'http://localhost:3000',
        rewrite: (p): string => p.replace(/^\/api/, ''),
        timeout: 5000,
      },
    },
  },
  build: {
    sourcemap: true,
    outDir: distDir,
  },
});
