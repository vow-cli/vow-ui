<!--
 * @Author: genfa.zeng
 * @Date: 2021-05-29 11:00:44
 * @Description: 
-->
<template>
  <div class="infinite-demo">
    <ul class="infinite-demo__ul">
      <vow-infinite-loading
        refresh-icon="cart"
        :is-open-refresh="true"
        @refresh="refresh"
        @load-more="loadMore"
      >
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
      for (let i = 0; i < 100; i++) {
        data.defaultList.push(`${i}`)
      }
    }
    onMounted(() => {
      init()
    })

    const refresh = (done: () => void) => {
      done()
    }

    const loadMore = (done: () => void) => {
      console.log('load-more')
      done()
    }
    return {
      refresh,
      loadMore,
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
  padding-top: 200px;
  &__ul {
    height: 100%;
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
