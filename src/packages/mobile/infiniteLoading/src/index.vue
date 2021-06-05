<!--
 * @Author: genfa.zeng
 * @Date: 2021-05-22 17:59:03
 * @LastEditors: genfa.zeng
 * @LastEditTime: 2021-06-05 22:07:30
 * @Description: 
-->
<template>
  <div
    ref="scroller"
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
      <div v-if="isInfiniting" class="vow-infinite-loading__load-box">
        <vow-icon class="vow-infinite-loading__load-icon" :name="loadIcon"></vow-icon>
        <span class="vow-infinite-loading__load-text">{{ loadText }}</span>
      </div>
      <div v-else-if="!hasMore" class="vow-infinite-loading__nomore-box">
        <span class="vow-infinite-loading__nomore-text">{{ noMoreText }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, reactive, toRefs } from 'vue'
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
      default: 'loading',
    },
    loadText: {
      type: String,
      default: '加载中...',
    },
    noMoreText: {
      type: String,
      default: '到底了~',
    },
    useWindow: {
      type: Boolean,
      default: true,
    },
    containerId: {
      type: String,
      default: '',
    },
    useCapture: {
      type: Boolean,
      default: false,
    },
    isOpenRefresh: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['refresh', 'load-more', 'scroll-change'],
  setup(props, { emit }) {
    const state = reactive({
      scrollEl: window as Window | HTMLElement | (Node & ParentNode),
      scroller: null as null | HTMLElement,
      isInfiniting: false,
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
    const requestAniFrame = () => {
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function (callback) {
          window.setTimeout(callback, 1000 / 60)
        }
      )
    }
    const getParentElement = (el: HTMLElement) => {
      return !!props.containerId
        ? document.querySelector(`#${props.containerId}`)
        : el && el.parentNode
    }

    const getWindowScrollTop = () => {
      return window.pageYOffset !== undefined
        ? window.pageYOffset
        : (document.documentElement || document.body.parentNode || document.body).scrollTop
    }

    const calculateTopPosition = (el: HTMLElement): number => {
      return !el ? 0 : el.offsetTop + calculateTopPosition(el.offsetParent as HTMLElement)
    }

    const isScrollAtBottom = () => {
      let offsetDistance = 0
      let resScrollTop = 0
      let direction = 'down'
      const windowScrollTop = getWindowScrollTop()
      if (props.useWindow) {
        if (state.scroller) {
          offsetDistance =
            calculateTopPosition(state.scroller) +
            state.scroller.offsetHeight -
            windowScrollTop -
            window.innerHeight
        }

        resScrollTop = windowScrollTop
      } else {
        const { scrollHeight, clientHeight, scrollTop } = state.scrollEl as HTMLElement
        offsetDistance = scrollHeight - clientHeight - scrollTop
        resScrollTop = scrollTop
      }
      if (state.beforeScrollTop > resScrollTop) {
        direction = 'up'
      } else {
        direction = 'down'
      }
      state.beforeScrollTop = resScrollTop
      emit('scroll-change', resScrollTop)
      return offsetDistance <= props.threshold && direction == 'down'
    }

    const infiniteDone = () => {
      state.isInfiniting = false
    }

    const handleScroll = () => {
      requestAniFrame()(() => {
        if (!isScrollAtBottom() || !props.hasMore || state.isInfiniting) {
          return false
        } else {
          state.isInfiniting = true
          emit('load-more', infiniteDone)
        }
      })
    }

    const scrollListener = () => {
      state.scrollEl.addEventListener('scroll', handleScroll, props.useCapture)
    }

    onMounted(() => {
      const parentElement = getParentElement(state.scroller as HTMLElement) as Node & ParentNode
      state.scrollEl = props.useWindow ? window : parentElement
      scrollListener()
    })

    onUnmounted(() => {
      state.scrollEl.removeEventListener('scroll', handleScroll, props.useCapture)
    })
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
