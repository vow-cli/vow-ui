/*
 * @Author: genfa.zeng
 * @Date: 2021-05-29 10:46:42
 * @LastEditors: genfa.zeng
 * @LastEditTime: 2021-05-30 13:08:05
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

const modulesPage = import.meta.glob('/src/packages/**/demo.vue')
for (const path in modulesPage) {
  const execResult = /packages\/mobile\/(.*)\/src\/demo.vue/.exec(path)
  const name = execResult ? execResult[1] : ''
  routes.push({
    path: '/' + name,
    component: modulesPage[path],
    name: name ? name[1] : '',
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
