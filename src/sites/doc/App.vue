<!--
 * @Author: genfa.zeng
 * @Date: 2021-05-29 11:33:20
 * @Description: 根组件
-->
<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App',
  setup() {
    return {}
  },
})
</script>

<style lang="scss">
html,
body {
  height: 100%;
  overflow: hidden;
}
#doc {
  width: 100%;
  height: 100%;
  background: #fff;
  overflow: hidden;
}
</style>
