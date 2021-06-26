/*
 * @Author: genfa.zeng
 * @Date: 2021-05-29 11:34:10
 * @Description:组件库文档入口文件
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/sites/assets/scss/reset.scss'
import { isMobile } from '@/sites/utils/isMobile'

if (isMobile) {
  location.replace('mobile.html')
}

createApp(App).use(router).mount('#doc')
