<template>
  <transition name="toast-fade" @after-leave="onAfterLeave">
    <div
      v-show="state.showToast"
      :class="toastBodyClass"
      :style="toastBodyStyle"
      @click="clickOverlay"
    >
      <div class="vow-toast__inner" :style="toastInnerStyle">
        <div v-if="hasIcon" class="vow-toast__icon-wrapper">
          <vow-icon size="20" color="#ffffff" :name="icon"></vow-icon>
        </div>
        <div class="vow-toast__text">{{ message }}</div>
      </div>
    </div>
  </transition>
</template>
<script lang="ts">
import { defineComponent, PropType, computed, reactive, watch, onMounted } from 'vue'
import vowIcon from '../../icon'

type sizeType = PropType<'base' | 'small' | 'large'>
type toastType = PropType<'text' | 'success' | 'error' | 'warning' | 'loading'>

export default defineComponent({
  name: 'VowToast',
  components: { vowIcon },
  props: {
    id: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      default: '',
    },
    duration: {
      type: Number,
      default: 2000,
    },
    center: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String as toastType,
      default: 'text',
    },
    customClass: {
      type: String,
      default: '',
    },
    bottom: {
      type: Number,
      default: 30,
    },
    size: {
      type: String as sizeType,
      validator: (val: string) => {
        return ['base', 'small', 'large'].includes(val)
      },
      default: 'base',
    },
    icon: {
      type: String,
      default: '',
    },
    textAlignCenter: {
      type: Boolean,
      default: true,
    },
    loadingRotate: {
      type: Boolean,
      default: true,
    },
    bgColor: {
      type: String,
      default: 'rgba(0, 0, 0, .8)',
    },
    onClose: {
      type: Function,
      default: null,
    },
    unMount: {
      type: Function,
      default: null,
    },
    cover: {
      type: Boolean,
      default: false,
    },
    coverColor: {
      type: String,
      default: 'rgba(0,0,0,0)',
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    let timer: number | null = null

    const state = reactive({
      showToast: false,
    })

    const hasIcon = computed(() => {
      if (props.type !== 'text') {
        return true
      } else {
        return !!props.icon
      }
    })

    const toastBodyClass = computed(() => {
      return [
        'vow-toast',
        { 'is-center': props.center },
        { 'is-has-icon': hasIcon.value },
        { 'is-cover': props.cover },
        {
          'is-loading': props.type === 'loading',
        },
        props.customClass,
        'is-' + props.size,
      ]
    })

    const toastBodyStyle = computed(() => {
      return {
        backgroundColor: props.coverColor,
        bottom: props.center ? 'auto' : props.bottom + 'px',
      }
    })

    const toastInnerStyle = computed(() => {
      return {
        textAlign: props.textAlignCenter ? 'center' : 'left',
        backgroundColor: props.bgColor,
      }
    })

    const clearTimer = () => {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
    }

    const showToast = () => {
      clearTimer()
      if (props.duration) {
        timer = setTimeout(() => {
          hideToast()
        }, props.duration)
      }
    }

    const hideToast = () => {
      state.showToast = false
    }

    if (props.duration) {
      showToast()
    }

    watch(
      () => props.duration,
      (val) => {
        if (val) {
          showToast()
        }
      }
    )

    onMounted(() => {
      state.showToast = true
    })

    const clickOverlay = () => {
      if (props.closeOnClickOverlay) {
        hideToast()
      }
    }

    const onAfterLeave = () => {
      clearTimer()
      //props.unMount(props.id)
      props.onClose && props.onClose()
    }

    return {
      state,
      toastBodyClass,
      toastBodyStyle,
      toastInnerStyle,
      hasIcon,
      clickOverlay,
      onAfterLeave,
    }
  },
})
</script>

<style lang="scss" scoped src="./index.scss"></style>
