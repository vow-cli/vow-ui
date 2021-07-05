<!--
 * @Author: genfa.zeng
 * @Date: 2021-06-26 17:59:09
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-03 23:03:59
 * @Description: 
-->
<template>
  <vow-toast message="提示" :duration="0" size="small"></vow-toast>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Toast from '../index'
export default defineComponent({
  name: 'VowToastDemo',
  setup() {
    const textToast = (message: string) => {
      Toast.text(message)
    }
    textToast('hello world')
    return {}
  },
})
</script>

<style lang="scss"></style>
