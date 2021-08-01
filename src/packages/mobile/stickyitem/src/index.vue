<template>
  <div class="vow-sticky-item">
    <div class="vow-sticky-item__header-warpper" :style="stickyHeaderWrapperStyle"></div>
    <div ref="stickyItemHeader" class="vow-sticky-item__header" :style="stickyHeaderStyle">
      <slot name="header"></slot>
    </div>
    <div class="vow-sticky-item__body">
      <slot name="body"></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, inject, watch, reactive, onMounted, toRefs } from 'vue'
import { stickyProvideType } from '../../sticky/src/index.vue'
export default defineComponent({
  name: 'VowStickyItem',
  props: {
    top: {
      type: Number,
      default: 0,
    },
  },
  emits: ['on-sticky', 'on-unsticky'],
  setup(props, { emit }) {
    const state = reactive({
      isFixedTop: false,
      stickyItemHeader: null as null | HTMLElement,
      stickyItemHeaderTop: 0,
      stickyItemHeaderHeight: 0,
    })

    // sticky父组件数据
    const stickyProvideProps = inject('stickyProvideProps') as stickyProvideType

    /**
     * @description:根据参照物不同计算定位位置
     * @param {*}
     * @return {*}
     */
    const getFixedTop = (): number => {
      if (stickyProvideProps.useWindow) {
        return props.top
      } else {
        return stickyProvideProps.stickyContainerTop.value + props.top
      }
    }

    //stickyItemHeader样式策略
    const stickyItemHeaderStyleStrategy = {
      css: () => {
        return {
          position: 'sticky',
          top: props.top + 'px',
          zIndex: 9,
        }
      },
      js: () => {
        return state.isFixedTop
          ? {
              position: 'fixed',
              top: getFixedTop() + 'px',
              left: '0px',
              right: '0px',
              zIndex: 9,
            }
          : {}
      },
    }

    /**
     * @description:吸顶效果: mode为css时，通过position：sticky实现;
     * mode为js时,通过position:fixed;实现吸顶效果
     * @param {*}
     * @return {*}
     */
    const stickyHeaderStyle = computed(() => {
      const mode = stickyProvideProps.mode
      return stickyItemHeaderStyleStrategy[mode]()
    })

    /**
     * @description:计算stickyHeaderWrapper样式;
     * 其用于占位,因为header吸顶后脱离文档流，导致组件高度会减小
     * @param {*}
     * @return {*}
     */
    const stickyHeaderWrapperStyle = computed(() => {
      return {
        height:
          state.isFixedTop && state.stickyItemHeaderHeight
            ? state.stickyItemHeaderHeight + 'px'
            : 'auto',
      }
    })

    const handleScroll = (scrollTop: number) => {
      const isFixedTop = scrollTop > state.stickyItemHeaderTop - props.top
      if (state.isFixedTop === isFixedTop) {
        return
      }
      if (isFixedTop) {
        emit('on-sticky')
      } else {
        emit('on-unsticky')
      }
      state.isFixedTop = isFixedTop
    }

    /**
     * @description:监听windowScrollTop变化,计算相关位置信息
     * @param {*}
     * @return {*}
     */
    watch(stickyProvideProps.windowScrollTop, (scrollTop) => {
      if (stickyProvideProps.mode === 'js') {
        handleScroll(scrollTop)
      }
    })

    /**
     * @description: 计算stickyItemHeader初始位置等信息,滚动时用于位置计算
     * 注意：当数据时动态变化时需要调用此方法重新计算位置
     * @param {*}
     * @return {*}
     */
    const initStickyItemHeaderBaseData = () => {
      const { top: headerTop, height: headerHeight } =
        state.stickyItemHeader?.getBoundingClientRect() as DOMRect
      state.stickyItemHeaderTop = headerTop
      state.stickyItemHeaderHeight = headerHeight
    }

    onMounted(() => {
      initStickyItemHeaderBaseData()
    })

    return {
      stickyHeaderStyle,
      stickyHeaderWrapperStyle,
      ...toRefs(state),
    }
  },
})
</script>

<style lang="scss">
@import './index.scss';
</style>
