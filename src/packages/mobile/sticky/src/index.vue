<template>
  <div class="vow-sticky">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'

type modeType = PropType<'js' | 'css'>

export default defineComponent({
  name: 'VowSticky',
  props: {
    mode: {
      type: String as modeType,
      validator: (val: string) => {
        return ['css', 'js'].includes(val)
      },
      default: 'js',
    },
    useWindow: {
      type: Boolean,
      default: true,
    },
    containerId: {
      type: String,
      default: '',
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
