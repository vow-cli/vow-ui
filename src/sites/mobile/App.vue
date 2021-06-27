<!--
 * @Author: genfa.zeng
 * @Date: 2021-05-29 10:46:23
 * @Description: 
-->
<template>
  <div :class="['mobile', showNav ? 'pd56' : '']">
    <div v-if="showNav" class="mobile-nav">
      <div class="mobile-nav-back" @click="goBack">
        <vow-icon name="back" size="24"></vow-icon>
      </div>
      {{ title }}
    </div>
    <div class="mobile-view">
      <router-view></router-view>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
  name: 'App',
  setup() {
    const title = ref('vowui')
    const showNav = ref(false)
    const route = useRoute()
    const router = useRouter()
    const goBack = () => {
      router.back()
    }
    watch(
      () => route,
      (route) => {
        if (route.meta) {
          console.log(route.meta)
          title.value = route.meta.title as string
          showNav.value = route.meta.showNav as boolean
        }
      },
      {
        immediate: true,
        deep: true,
      }
    )
    return {
      title,
      goBack,
      showNav,
    }
  },
})
</script>

<style lang="scss">
html,
body {
  width: 100%;
  min-height: 100vh !important;
  &::-webkit-scrollbar {
    width: 0 !important;
  }
}
#mobile {
  width: 100%;
  min-height: 100%;
  background: #fff;
}
.pd56 {
  padding-top: 56px;
}
.mobile-nav {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  line-height: 56px;
  text-align: center;
  background: #fff;
  font-weight: bold;
  font-size: 20px;
  color: rgba(51, 51, 51, 1);
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.07);
  &-back {
    position: absolute;
    left: 0;
    height: 100%;
    width: 50px;
    @include flex(row, center, center);
    i {
      font-size: 24px;
    }
  }
}
.mobile-view {
  min-height: calc(100vh - 56px);
}
</style>
