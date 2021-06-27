<!--
 * @Author: genfa.zeng
 * @Date: 2021-06-26 18:54:20
 * @Description: 
-->
<template>
  <div class="doc-demo-preview">
    <iframe :src="url" frameborder="0"></iframe>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'DocDemoPreview',
  props: {
    url: {
      type: String,
      default: '',
    },
  },
})
</script>

<style lang="scss">
.doc-demo-preview {
  height: 100%;
  max-height: 667px;
  width: 375px;
  background: #fafafa;
  border-radius: 20px;
  box-shadow: 0 8px 12px #ebedf0;
  overflow: hidden;
  iframe {
    height: 100%;
    width: 100%;
  }
}
</style>
