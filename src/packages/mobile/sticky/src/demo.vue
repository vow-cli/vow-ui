<!--
 * @Author: genfa.zeng
 * @Date: 2021-06-26 17:59:09
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-01 15:17:37
 * @Description: 
-->
<template>
  <div class="sticky-demo">
    <vow-sticky mode="js">
      <vow-sticky-item :top="56">
        <template #header>
          <div class="search-box">
            <vow-icon name="search" size="24" color="#c0c0c0"></vow-icon>
            <input type="text" disabled placeholder="搜索" />
          </div>
        </template>
        <template #body>
          <div class="icon-demo">
            <ul class="icon-demo-list">
              <li v-for="item in iconList" :key="item.fontClass" class="icon-demo-item">
                <vow-icon :name="item.fontClass" color="#323233" size="40"></vow-icon>
                <span class="icon-demo-item__text">{{ item.fontClass }}</span>
              </li>
            </ul>
          </div>
          <vow-sticky mode="js">
            <vow-sticky-item :top="100">
              <template #header>
                <div class="search-box">
                  <vow-icon name="search" size="24" color="#c0c0c0"></vow-icon>
                  <input type="text" disabled placeholder="搜索" />
                </div>
              </template>
              <template #body>
                <div class="icon-demo">
                  <ul class="icon-demo-list">
                    <li v-for="item in iconList" :key="item.fontClass" class="icon-demo-item">
                      <vow-icon :name="item.fontClass" color="#323233" size="40"></vow-icon>
                      <span class="icon-demo-item__text">{{ item.fontClass }}</span>
                    </li>
                  </ul>
                </div>
              </template>
            </vow-sticky-item>
          </vow-sticky>
        </template>
      </vow-sticky-item>
    </vow-sticky>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import iconFontJson from '@/styles/iconfont/iconfont.js'
export default defineComponent({
  name: 'StickyDemo',
  setup() {
    const iconList = computed(() => {
      return iconFontJson.glyphs.map((e) => ({
        fontClass: e.font_class,
      }))
    })
    return {
      iconList,
    }
  },
})
</script>

<style lang="scss">
.sticky-demo {
  background: #fff;
}
.vow-sticky-item__header {
  background: #ccc;
  padding: 12px 0;
}
.search-box {
  width: 310px;
  height: 30px;
  border-radius: 15px;
  border: 1px solid #c0c0c0;
  display: flex;
  align-items: center;
  margin: 0 auto;
  background: #fff;
  padding: 0 6px;
}
.icon-demo {
  padding: 20px 0;
  background: #f7f8fa;
  &-list {
    @include flex(row, null, null, wrap);
    width: 340px;
    background: #fff;
    margin: 0 auto;
    border-radius: 20px;
    overflow: hidden;
  }
  &-item {
    width: 25%;
    height: 100px;
    @include flex(column, center, center);
    &__text {
      max-width: 100%;
      padding: 0 5px;
      color: #646566;
      font-size: 12px;
      line-height: 18px;
      @include ellipsis();
    }
  }
}
</style>
