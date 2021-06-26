<!--
 * @Author: genfa.zeng
 * @Date: 2021-06-26 18:44:33
 * @Description: 文档首页头部
-->
<template>
  <div class="doc-header">
    <div class="doc-header-icon">
      <span class="doc-header-icon__text">Vow UI</span>
    </div>
    <div class="doc-header-content">
      <div class="doc-header-search">
        <search></search>
      </div>
      <div class="doc-header-nav">
        <div v-for="item in header" :key="item.name" class="doc-header-nav__item">
          <router-link :to="item.path">
            {{ item.title }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { header } from '@/config.json'
import Search from './Search.vue'
export default defineComponent({
  name: 'DocHeader',
  components: { Search },
  setup() {
    return {
      header,
    }
  },
})
</script>

<style lang="scss">
.doc-header {
  @include flex(row, space-between, center);
  min-height: 58px;
  padding: 12px 24px;
  border-bottom: 1px solid #eaecef;
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  &-icon {
    flex: 0 0 216px;
    color: #45526b;
    font-size: 22px;
    text-align: left;
  }
  &-content {
    @include flex(row, null, center);
  }
  &-nav {
    @include flex(row, flex-end, center);
    &__item {
      margin: 0 24px;
      a {
        color: #45526b;
        font-size: 14px;
      }
      .router-link-active {
        padding-bottom: 4px;
        border-bottom: 2px solid #468dd9;
      }
    }
  }
}
</style>
