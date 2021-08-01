<template>
  <div ref="scroller" class="vow-sticky">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  PropType,
  provide,
  reactive,
  computed,
  ComputedRef,
  toRefs,
  onUnmounted,
} from 'vue'

type modeType = PropType<'js' | 'css'>

export type stickyProvideType = {
  mode: 'js' | 'css'
  useWindow: boolean
  containerId: string
  stickyContainerTop: ComputedRef<number>
  windowScrollTop: ComputedRef<number>
}

export default defineComponent({
  name: 'VowSticky',
  props: {
    mode: {
      type: String as modeType,
      validator: (val: string) => {
        return ['css', 'js'].includes(val)
      },
      default: 'css',
    },
    useWindow: {
      type: Boolean,
      default: true,
    },
    containerId: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const state = reactive({
      stickyContainerTop: 0,
      scrollTop: 0,
      scrollEl: window as Window | HTMLElement | (Node & ParentNode),
      scroller: null as null | HTMLElement,
    })

    const stickyProvideProps: stickyProvideType = {
      mode: props.mode,
      useWindow: props.useWindow,
      containerId: props.containerId,
      stickyContainerTop: computed(() => state.stickyContainerTop),
      windowScrollTop: computed(() => state.scrollTop),
    }

    //传值给stickItem组件
    provide('stickyProvideProps', stickyProvideProps)

    const getParentElement = (el: HTMLElement) => {
      return !!props.containerId
        ? document.querySelector(`#${props.containerId}`)
        : el && el.parentNode
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

    const getWindowScrollTop = () => {
      return window.pageYOffset !== undefined
        ? window.pageYOffset
        : (document.documentElement || document.body.parentNode || document.body).scrollTop
    }

    const getParentScrollTop = () => {
      const stickContainerEl = state.scrollEl as HTMLElement
      const stickyContainerScrollTop = stickContainerEl.scrollTop
      return state.stickyContainerTop + stickyContainerScrollTop
    }

    const handleScroll = () => {
      requestAniFrame()(() => {
        if (props.useWindow) {
          state.scrollTop = getWindowScrollTop()
        } else {
          state.scrollTop = getParentScrollTop()
        }
      })
    }

    const scrollListener = () => {
      state.scrollEl.addEventListener('scroll', handleScroll)
    }

    const getStickyContainerBaseData = () => {
      const stickContainerEl = state.scrollEl as HTMLElement
      const { top: stickyContainerTop } = stickContainerEl.getBoundingClientRect()
      state.stickyContainerTop = stickyContainerTop
    }

    onMounted(() => {
      const parentElement = getParentElement(state.scroller as HTMLElement) as Node & ParentNode
      state.scrollEl = props.useWindow ? window : parentElement

      if (!props.useWindow) {
        getStickyContainerBaseData()
      }
      scrollListener()
    })

    onUnmounted(() => {
      state.scrollEl.removeEventListener('scroll', handleScroll)
    })

    return {
      ...toRefs(state),
    }
  },
})
</script>

<style lang="scss">
@import './index.scss';
</style>
