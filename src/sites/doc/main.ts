/*
 * @Author: genfa.zeng
 * @Date: 2021-05-29 11:34:10
 * @LastEditors: genfa.zeng
 * @LastEditTime: 2021-05-29 12:05:25
 * @Description:
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { isMobile } from '@/sites/utils/isMobile'

if (isMobile) {
  location.replace('mobile.html')
}

createApp(App).use(router).mount('#doc')
