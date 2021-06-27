<!--
 * @Author: genfa.zeng
 * @Date: 2021-05-29 10:58:00
 * @Description: 
-->
<template>
  <div class="index">
    <div class="index-header">
      <h1>VowUI</h1>
      <p>轻量级移动端 Vue 组件库</p>
    </div>
    <div class="index-components">
      <div v-for="_nav in nav" :key="_nav">
        <p v-if="_nav.packages.length > 0" class="index-components__title">{{ _nav.name }}</p>
        <ul>
          <template v-for="_package in _nav.packages" :key="_package">
            <li v-if="_package.show" class="index-components__item">
              <router-link :to="_package.name.toLowerCase()"
                >{{ _package.name }}&nbsp;&nbsp;{{ _package.title }}</router-link
              >
              <vow-icon size="14px" color="#323233" name="next"></vow-icon>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { nav, versions } from '@/config.json'
export default defineComponent({
  name: 'Doc',
  setup() {
    return reactive({
      nav,
      versions,
    })
  },
})
</script>
<style lang="scss" scoped>
.index {
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  background: #fff;
  &-header {
    margin-left: 16px;
    h1 {
      height: 48px;
      line-height: 48px;
      font-size: 22px;
      color: rgba(51, 51, 51, 1);
    }
    p {
      font-size: 14px;
      color: rgba(69, 90, 100, 0.6);
    }
  }
  &-components {
    &__title {
      margin: 24px 0 8px 16px;
      color: rgba(69, 90, 100, 0.6);
      font-size: 14px;
    }
    &__item {
      @include flex(row, space-between, center);
      margin: 0 0 12px;
      padding: 0 20px;
      font-weight: 600;
      font-size: 14px;
      line-height: 40px;
      background: #f7f8fa;
      border-radius: 99px;
      -webkit-transition: background 0.3s;
      transition: background 0.3s;
      a {
        color: #323233;
      }
    }
  }
}
</style>
