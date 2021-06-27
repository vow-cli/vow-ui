/*
 * @Author: genfa.zeng
 * @Date: 2021-05-29 10:46:34
 * @Description:
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VowUI from '@/vow-ui'
import '@/sites/assets/scss/reset.scss'

createApp(App).use(router).use(VowUI).mount('#mobile')
