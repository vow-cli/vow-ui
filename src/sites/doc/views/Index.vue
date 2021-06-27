<!--
 * @Author: genfa.zeng
 * @Date: 2021-05-29 11:50:24
 * @Description: 组件库文档首页
-->
<template>
  <doc-header></doc-header>
  <div class="doc-content">
    <div class="doc-content-document">
      <router-view />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import { onBeforeRouteUpdate, RouteLocationNormalized, useRoute } from 'vue-router'
import DocHeader from '@/sites/doc/components/DocHeader.vue'

export default defineComponent({
  name: 'Doc',
  components: {
    DocHeader,
  },
  setup() {
    const data = reactive({
      demoUrl: 'demo.html',
    })

    const watchDemoUrl = (router: RouteLocationNormalized) => {
      const { origin, pathname } = window.location

      data.demoUrl = `${origin}${pathname.replace('index.html', '')}demo.html#${router.path}`
    }

    onMounted(() => {
      const route = useRoute()
      watchDemoUrl(route)
    })

    onBeforeRouteUpdate((to) => {
      watchDemoUrl(to)
    })

    return data
  },
})
</script>

<style lang="scss" scoped>
.doc {
  &-content {
    padding-top: 58px;
    height: 100%;
    overflow: hidden;
    &-document {
      height: 100%;
    }
  }
}
</style>
