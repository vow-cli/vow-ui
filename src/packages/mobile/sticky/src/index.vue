<template>
  <div class="vow-sticky">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'VowSticky',
  setup() {
    return {}
  },
})
</script>

<style lang="scss">
@import './index.scss';
</style>
