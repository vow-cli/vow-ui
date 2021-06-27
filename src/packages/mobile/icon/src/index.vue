<!--
 * @Author: genfa.zeng
 * @Date: 2021-05-30 15:48:58
 * @Description: 
-->
<script lang="ts">
import { computed, defineComponent, h, PropType } from 'vue'
import { pxCheck } from '@/utils/helper'

export default defineComponent({
  name: 'VowIcon',
  props: {
    name: {
      type: String,
      default: '',
    },
    size: {
      type: [String, Number],
      default: '',
    },
    classPrefix: {
      type: String,
      default: 'vowui-iconfont vow-icon',
    },
    color: {
      type: String,
      default: '',
    },
    tag: {
      type: String as PropType<keyof HTMLElementTagNameMap>,
      default: 'i',
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    const handleClick = (event: Event) => {
      emit('click', event)
    }

    const isImage = () => {
      return props.name ? props.name.indexOf('/') !== -1 : false
    }

    const iconSize = computed(() => {
      return pxCheck(props.size)
    })

    return () => {
      const _isImage = isImage()
      return h(_isImage ? 'img' : props.tag, {
        class: _isImage ? 'vow-icon-img' : `${props.classPrefix} vow-icon-${props.name}`,
        style: {
          color: props.color,
          fontSize: iconSize.value,
          width: iconSize.value,
          height: iconSize.value,
        },
        onClick: handleClick,
        src: _isImage ? props.name : '',
      })
    }
  },
})
</script>
<style lang="scss">
@import './index.scss';
</style>
