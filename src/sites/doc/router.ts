/*
 * @Author: genfa.zeng
 * @Date: 2021-05-29 11:34:28
 * @LastEditors: genfa.zeng
 * @LastEditTime: 2021-05-29 11:55:51
 * @Description:
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Index from './views/Index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: '/',
    component: Index,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
