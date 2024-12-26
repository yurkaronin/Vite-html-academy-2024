import { defineConfig } from 'vite';
import createSvgSpritePlugin from 'vite-plugin-svg-spriter';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

import viteImagemin from 'vite-plugin-imagemin'; // Не обязательный функционал
import imageminWebp from 'imagemin-webp'; // Не обязательный функционал


import {resolve} from 'path'; //Импортируем функцию resolve из модуля path. Функция resolve используется для преобразования относительных путей в абсолютные пути.

const SRC_PATH = resolve(__dirname, 'src');
const SVG_FOLDER_PATH = resolve(SRC_PATH, 'assets', 'svg'); // Папка с SVG-иконками

export default defineConfig({
  root: 'src', // Рабочая папка — src
  publicDir: '../public', // publicDir в корне проекта, если он находится на уровне src
  build: {
    outDir: '../dist', // Выходная папка dist на уровне проекта
    minify: 'esbuild', // Минификация JavaScript (по умолчанию)
    cssMinify: 'lightningcss', // Минификация CSS с помощью lightningcss
    sourcemap: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/index.html'),
        about: resolve(__dirname, 'src/pages/about/index.html'),
        contacts: resolve(__dirname, 'src/pages/contacts/index.html'),
      },
    },
  },
  plugins: [
    // оптимизация изображений с помощью ViteImageOptimizer
    ViteImageOptimizer({
      jpg: {
        quality: 75, // Оптимизация JPEG
      },
      png: {
        quality: 75, // Оптимизация PNG
      },
      // Генерация WebP из JPEG и PNG
      webp: {
        quality: 75, // Установите качество для WebP
      },
    }),
    createSvgSpritePlugin({
      svgFolder: SVG_FOLDER_PATH, // Путь к папке с SVG-иконками
      symbolId: 'icon-[name]', // ID для каждого символа
    }),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 75, // Оптимизация для JPEG
      },
      pngquant: {
        quality: [0.65, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
      // Настройки для WebP
      webp: imageminWebp({
        quality: 75, // качество изображения WebP
      }),
    }),
  ],
});
