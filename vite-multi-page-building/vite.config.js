import { defineConfig } from 'vite';
import createSvgSpritePlugin from 'vite-plugin-svg-spriter';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { resolve } from 'path';

const SRC_PATH = resolve(__dirname, 'src');
const SVG_FOLDER_PATH = resolve(SRC_PATH, 'assets', 'svg');

export default defineConfig({
  root: 'src', // Рабочая папка — src
  publicDir: '../public', // publicDir в корне проекта
  build: {
    outDir: '../dist', // Выходная папка dist на уровне проекта
    minify: 'esbuild', // Минификация JavaScript
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
    // Оптимизация изображений с помощью ViteImageOptimizer
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
        method: 6,   // Метод сжатия для WebP (от 0 до 6)
        alphaQuality: 90,  // Качество для прозрачных PNG
      },
    }),
    createSvgSpritePlugin({
      svgFolder: SVG_FOLDER_PATH, // Путь к папке с SVG-иконками
      symbolId: 'icon-[name]', // ID для каждого символа
    }),
  ],
});
