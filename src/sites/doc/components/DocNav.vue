<!--
 * @Author: genfa.zeng
 * @Date: 2021-06-26 18:44:42
 * @Description: 文档首页菜单栏
-->
<template>
  <div class="doc-nav">
    <div v-for="_nav in nav" :key="_nav">
      <div v-if="_nav.packages.length > 0" class="doc-nav__title">{{ _nav.name }}</div>
      <div>
        <template v-for="_package in _nav.packages" :key="_package">
          <div v-if="_package.show" class="doc-nav__item">
            <router-link :to="_package.name.toLowerCase()">
              {{ _package.name }}&nbsp;&nbsp;{{ _package.title }}
            </router-link>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { nav } from '@/config.json'
export default defineComponent({
  name: 'DocNav',
  setup() {
    return {
      nav,
    }
  },
})
</script>

<style lang="scss">
.doc-nav {
  padding: 24px 12px;
  &__title {
    padding: 8px 0 8px 24px;
    color: #455a64;
    font-weight: 600;
    font-size: 15px;
    line-height: 28px;
  }
  &__item {
    a {
      display: block;
      margin: 8px 0;
      padding: 8px 0 8px 24px;
      color: #455a64;
      font-size: 14px;
      line-height: 20px;
      transition: color 0.2s;
      &:hover {
        color: #3683d7;
      }
    }
    .router-link-active {
      background-color: #e4f1ff;
      border-radius: 999px;
      color: #3683d7;
    }
  }
}
</style>
