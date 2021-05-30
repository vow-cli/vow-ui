/*
 * @Author: genfa.zeng
 * @Date: 2021-05-29 10:46:34
 * @LastEditors: genfa.zeng
 * @LastEditTime: 2021-05-30 14:02:40
 * @Description:
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VowUI from '@/vow-ui'
import '@/sites/assets/styles/reset.scss'

createApp(App).use(router).use(VowUI).mount('#mobile')
