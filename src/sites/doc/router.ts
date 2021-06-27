import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Index from './views/Index.vue'

const componentPages = []
const modulesPage = import.meta.glob('/src/packages/mobile/**/doc.md')
for (const path in modulesPage) {
  const name = (/packages\/mobile\/(.*)\/src\/doc.md/.exec(path) as any[])[1]
  componentPages.push({
    path: '/' + name,
    component: modulesPage[path],
    name,
  })
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: '/',
    component: Index,
    redirect: 'intro',
    children: [
      {
        path: '/intro',
        name: 'intro',
        component: () => import('@/sites/doc/views/Intro.md'),
      },
      {
        path: '/start',
        name: 'start',
        component: () => import('@/sites/doc/views/Start.md'),
      },
      {
        path: '/component',
        name: 'component',
        redirect: componentPages[0].name,
        component: () => import('@/sites/doc/views/Component.vue'),
        children: componentPages,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
