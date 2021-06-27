<!--
 * @Author: genfa.zeng
 * @Date: 2021-05-30 15:49:11
 * @Description: 
-->
<template>
  <div class="icon-demo">
    <ul class="icon-demo-list">
      <li v-for="item in iconList" :key="item.fontClass" class="icon-demo-item">
        <vow-icon :name="item.fontClass" color="#323233" size="40"></vow-icon>
        <span class="icon-demo-item__text">{{ item.fontClass }}</span>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import iconFontJson from '@/styles/iconfont/iconfont.js'
export default defineComponent({
  name: 'IconDemo',
  setup() {
    const iconList = computed(() => {
      return iconFontJson.glyphs.map((e) => ({
        fontClass: e.font_class,
      }))
    })
    console.log(iconList)
    return {
      iconList,
    }
  },
})
</script>

<style lang="scss">
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
