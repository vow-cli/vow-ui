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
})
</script>

<style lang="scss">
#doc {
  background: #f7f8fa;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
