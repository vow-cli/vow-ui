<template>
  <div class="vow-sticky-item">
    <!-- 用于占位,因为header吸顶后脱离文档流，导致组件高度会减小 -->
    <div class="vow-sticky-item__header-warpper"></div>
    <div class="vow-sticky-item__header">
      <slot name="header"></slot>
    </div>
    <div class="vow-sticky-item__body">
      <slot name="body"></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'VowStickyItem',
  props: {
    top: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    return {}
  },
})
</script>

<style lang="scss">
@import './index.scss';
</style>
