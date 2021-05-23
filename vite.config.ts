/*
 * @Author: genfa.zeng
 * @Date: 2021-05-16 11:53:49
 * @LastEditors: genfa.zeng
 * @LastEditTime: 2021-05-16 17:39:37
 * @Description:
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

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
  },
  css: {
    preprocessorOptions: {
      scss: {
        // example : additionalData: `@import "./src/design/styles/variables";`
        // dont need include file extend .scss
        additionalData: `@import "@/styles/common/variables.scss";@import "@/styles/mixins/mixins.scss";`,
      },
    },
  },
  plugins: [vue()],
})
