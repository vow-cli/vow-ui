import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { resolve } from 'path'
import Markdown from 'vite-plugin-md'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, './src'),
      },
    ],
  },
  build: {
    lib: {
      entry: 'src/vow-ui.ts',
      name: 'vow-ui',
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      input: {
        mobile: resolve(__dirname, 'mobile.html'),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/common/variables.scss";@import "@/sites/assets/scss/variables.scss";@import "@/styles/mixins/mixins.scss";`,
      },
    },
  },
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Markdown(),
  ],
})
