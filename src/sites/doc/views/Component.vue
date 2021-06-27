<!--
 * @Author: genfa.zeng
 * @Date: 2021-06-26 23:24:27
 * @Description: 组件页面
-->
<template>
  <div class="doc-component">
    <doc-nav class="doc-component-nav"></doc-nav>
    <div class="doc-component-inner">
      <div class="doc-component-md">
        <router-view></router-view>
      </div>
      <doc-demo-preview class="doc-component-preview" :url="previewUrl"></doc-demo-preview>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, nextTick, onMounted, onUpdated, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import DocNav from '@/sites/doc/components/DocNav.vue'
import DocDemoPreview from '@/sites/doc/components/DocDemoPreview.vue'
import hljs from 'highlight.js'
export default defineComponent({
  name: 'Component',
  components: { DocNav, DocDemoPreview },
  setup() {
    const route = useRoute()
    const previewUrl = ref('')

    const highlightBlock = () => {
      try {
        const codes = document.querySelectorAll('.markdown-body code') as NodeListOf<HTMLElement>
        codes.forEach((code) => {
          hljs.highlightBlock(code)
        })
      } catch (error) {
        console.log(error)
      }
    }

    const watchPreviewUrl = (path: string): void => {
      const { origin, pathname } = window.location
      previewUrl.value = `${origin}${pathname.replace('index.html', '')}mobile.html#${path}`
    }

    watchPreviewUrl('/')

    watch(
      () => route.path,
      (newPath) => {
        watchPreviewUrl(newPath)
      }
    )

    onMounted(() => {
      nextTick(() => {
        highlightBlock()
      })
    })

    onUpdated(() => {
      nextTick(() => {
        highlightBlock()
      })
    })

    return {
      previewUrl,
    }
  },
})
</script>

<style lang="scss">
.doc-component {
  @include flex(row);
  height: 100%;
  &-nav {
    flex: 0 0 240px;
    overflow-y: auto;
    background: #fff;
    height: 100%;
    box-shadow: 0 8px 12px #ebedf0;
  }
  &-inner {
    flex: 1;
    padding-right: 420px;
    @include flex(row, space-between);
    overflow: auto;
  }
  &-md {
    flex: 1;
    height: fit-content;
    padding: 12px 0;
    overflow: hidden;
    .markdown-body {
      max-width: $vowui-doc-contentWidth;
      margin: 0 auto;
    }
  }
  &-preview {
    flex: 0 0 375px;
    position: absolute;
    top: 76px;
    right: 36px;
  }
}
</style>
