import { defineConfig } from 'vite';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react';
// https://vitejs.dev/config/

const PwaConfig = {
  workbox: {
    sourcemap: true,
  },
  manifest: {
    name: 'FileServe.net',
    short_name: 'FileServe',
    theme_color: '#9eb9fd',
    description: '一个用心的图片服务器',
    lang: 'zh',
    icons: [
      {
        src: '//file.mo7.cc/static/logo/200.png',
        sizes: '200x200',
        type: 'image/png',
      },
      {
        src: '//file.mo7.cc/static/logo/512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '//file.mo7.cc/static/logo/200.png',
        sizes: '200x200',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '//file.mo7.cc/static/logo/512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    start_url: '/?mode=pwa',
    display: 'standalone',
    background_color: '#333333',
  },
};

import AppPackage from './package.json';

// const ProxyUrl = 'https://file.mo7.cc';
const ProxyUrl = `http://localhost:${AppPackage.Port}`;

export default defineConfig({
  define: {
    ViteConst: JSON.stringify({
      AppVersion: AppPackage.version,
      AppName: AppPackage.name,
      ProxyUrl,
    }),
  },
  root: './',
  plugins: [react(), VitePWA(PwaConfig)],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
  build: {
    outDir: './dist',
    sourcemap: true,
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          // 在此处设置，也可以设置直角、边框色、字体大小等
          'primary-color': '#9eb9fd',
        },
        javascriptEnabled: true,
      },
    },
  },
  server: {
    host: true,
    port: AppPackage.Port + 1,
    strictPort: true, // 端口已被占用则会直接退出
    proxy: {
      '/api': {
        // 设置你调用的接口域名和端口号 别忘了加http
        target: ProxyUrl,
        changeOrigin: true, // 允许跨域
      },
    },
  },
});
