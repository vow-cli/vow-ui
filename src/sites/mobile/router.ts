/*
 * @Author: genfa.zeng
 * @Date: 2021-05-29 10:46:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-27 18:54:41
 * @Description:
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Index from './components/Index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: '/',
    component: Index,
  },
]

const modulesPage = import.meta.glob('/src/packages/mobile/**/src/demo.vue')
for (const path in modulesPage) {
  const execResult = /packages\/mobile\/(.*)\/src\/demo.vue/.exec(path)
  const name = execResult ? execResult[1] : ''
  routes.push({
    path: '/' + name,
    component: modulesPage[path],
    name: name ? name[1] : '',
    meta: { title: name, showNav: true },
  })
}

routes.push({
  name: 'NotFound',
  path: '/:path(.*)+',
  redirect: () => '/',
})

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
