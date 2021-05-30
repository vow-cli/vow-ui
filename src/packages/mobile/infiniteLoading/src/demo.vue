<!--
 * @Author: genfa.zeng
 * @Date: 2021-05-29 11:00:44
 * @LastEditors: genfa.zeng
 * @LastEditTime: 2021-05-30 17:29:29
 * @Description: 
-->
<template>
  <div class="infinite-demo">
    <ul class="infinite-demo__ul">
      <vow-infinite-loading refresh-icon="cart" :is-open-refresh="true" @refresh="refresh">
        <li v-for="(item, index) in defaultList" :key="index" class="infinite-demo__li">
          {{ item }}
        </li>
      </vow-infinite-loading>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
export default defineComponent({
  name: 'InfiniteLoadingDemo',
  setup() {
    const data = reactive({
      defaultList: [''],
    })

    const init = () => {
      for (let i = 0; i < 10; i++) {
        data.defaultList.push(`${i}`)
      }
    }
    onMounted(() => {
      init()
    })

    const refresh = (done: () => void) => {
      done()
    }
    return {
      refresh,
      ...toRefs(data),
    }
  },
})
</script>

<style lang="scss">
html,
body {
  height: 100%;
}
.infinite-demo {
  &__ul {
    height: 300px;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
  &__li {
    margin-top: 10px;
    font-size: 14px;
    color: #646464;
    padding: 6px 0;
    border-bottom: 1px solid #ccc;
  }
}
</style>
