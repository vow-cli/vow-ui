<!--
 * @Author: genfa.zeng
 * @Date: 2021-06-26 23:24:27
 * @Description: 组件页面
-->
<template>
  <div class="doc-component">
    <doc-nav class="doc-component-nav"></doc-nav>
    <div class="doc-component-md">
      <router-view></router-view>
    </div>
    <doc-demo-preview class="doc-document-preview" :url="demoUrl"></doc-demo-preview>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import DocNav from '@/sites/doc/components/DocNav.vue'
import DocDemoPreview from '@/sites/doc/components/DocDemoPreview.vue'
export default defineComponent({
  name: '',
  components: { DocNav, DocDemoPreview },
  setup() {
    return {}
  },
})
</script>

<style lang="scss">
.doc-component {
  @include flex(row, space-between);
  height: 100%;
  &-nav {
    flex: 0 0 240px;
    height: 100%;
    overflow-y: auto;
    background: #fff;
    box-shadow: 0 8px 12px #ebedf0;
  }
  &-md {
    flex: 1;
  }
  &-preview {
    flex: 0 0 375px;
  }
}
</style>
