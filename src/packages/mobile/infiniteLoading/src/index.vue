<!--
 * @Author: genfa.zeng
 * @Date: 2021-05-22 17:59:03
 * @LastEditors: genfa.zeng
 * @LastEditTime: 2021-05-30 17:28:58
 * @Description: 
-->
<template>
  <div
    class="vow-infinite-loading"
    @touchstart="touchStart"
    @touchmove="touchMove"
    @touchend="touchEnd"
  >
    <!-- 下拉刷新 -->
    <div ref="refreshTopRef" class="vow-infinite-loading__top" :style="refreshTopStyle">
      <div class="vow-infinite-loading__refresh-box">
        <vow-icon class="vow-infinite-loading__refresh-icon" :name="refreshIcon"></vow-icon>
        <span class="vow-infinite-loading__refresh-text">{{ refreshText }}</span>
      </div>
    </div>
    <div class="vow-infinite-loading__center">
      <slot></slot>
    </div>
    <div class="vow-infinite-loading__bottom">
      <div class="vow-infinite-loading__load-box">
        <vow-icon class="vow-infinite-loading__load-icon" :name="loadIcon"></vow-icon>
        <span class="vow-infinite-loading__load-text"></span>
      </div>
      <div class="vow-infinite-loading__nomore-box">
        <span class="vow-infinite-loading__nomore-text"></span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  name: 'VowInfiniteLoading',
  props: {
    hasMore: {
      type: Boolean,
      default: true,
    },
    threshold: {
      type: Number,
      default: 200,
    },
    refreshIcon: {
      type: String,
      default:
        'https://img10.360buyimg.com/imagetools/jfs/t1/169863/6/4565/6306/60125948E7e92774e/40b3a0cf42852bcb.png',
    },
    refreshText: {
      type: String,
      default: '松开刷新',
    },
    loadIcon: {
      type: String,
      default:
        'https://img10.360buyimg.com/imagetools/jfs/t1/169863/6/4565/6306/60125948E7e92774e/40b3a0cf42852bcb.png',
    },
    loadText: {
      type: String,
      default: '加载中...',
    },
    loadMoreText: {
      type: String,
      default: '到底了~',
    },
    isOpenRefresh: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['refresh'],
  setup(props, { emit }) {
    const state = reactive({
      isTouching: false,
      beforeScrollTop: 0,
      refreshTopRef: null as null | HTMLElement,
      refreshMaxH: 0,
      distance: 0,
      x: 0,
      y: 0,
    })

    const refreshTopStyle = computed(() => {
      return {
        height: state.distance < 0 ? '0px' : `${state.distance}px`,
        transition: state.isTouching
          ? `height 0s cubic-bezier(0.25,0.1,0.25,1)`
          : `height 0.2s cubic-bezier(0.25,0.1,0.25,1)`,
      }
    })

    const refreshDone = () => {
      state.distance = 0
      state.isTouching = false
    }

    const touchStart = (event: TouchEvent) => {
      if (state.beforeScrollTop === 0 && !state.isTouching && props.isOpenRefresh) {
        state.y = event.touches[0].pageY
        state.isTouching = true
        const childHeight = ((state.refreshTopRef as HTMLElement).firstElementChild as HTMLElement)
          .offsetHeight
        state.refreshMaxH = Math.floor(childHeight * 1 + 10)
      }
    }

    const touchMove = (event: TouchEvent) => {
      state.distance = event.touches[0].pageY - state.y
      if (state.distance > 0 && state.isTouching) {
        event.preventDefault()
        if (state.distance >= state.refreshMaxH) {
          state.distance = state.refreshMaxH
        }
      } else {
        state.distance = 0
        state.isTouching = false
      }
    }

    const touchEnd = () => {
      if (state.distance < state.refreshMaxH) {
        state.distance = 0
      } else {
        emit('refresh', refreshDone)
      }
    }

    return {
      ...toRefs(state),
      touchStart,
      touchMove,
      touchEnd,
      refreshTopStyle,
    }
  },
})
</script>
<style lang="scss">
@import 'index.scss';
</style>
