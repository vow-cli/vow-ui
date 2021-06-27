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
      <doc-demo-preview class="doc-document-preview" :url="demoUrl"></doc-demo-preview>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, nextTick, onMounted, onUpdated } from 'vue'
import DocNav from '@/sites/doc/components/DocNav.vue'
import DocDemoPreview from '@/sites/doc/components/DocDemoPreview.vue'
import hljs from 'highlight.js'
export default defineComponent({
  name: 'Component',
  components: { DocNav, DocDemoPreview },
  setup() {
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

    return {}
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
    @include flex(row, space-between);
    overflow: auto;
  }
  &-md {
    flex: 1;
    height: auto;
    padding: 12px 0;
    .markdown-body {
      max-width: $vowui-doc-contentWidth;
      margin: 0 auto;
    }
  }
  &-preview {
    flex: 0 0 375px;
  }
}
</style>
