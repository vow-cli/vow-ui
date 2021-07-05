/*
 * @Author: genfa.zeng
 * @Date: 2021-07-03 22:33:36
 * @Description:通过JS调用Toast
 */
import { App, AppContext, createVNode, render } from 'vue'
import Toast from './index.vue'

const defaultOptions = {
  message: '',
  id: '',
  duration: 2000, //显示时间(毫秒)
  center: true,
  type: 'text',
  customClass: '',
  bottom: 30,
  size: 'base',
  icon: null,
  textAlignCenter: true,
  loadingRotate: true,
  bgColor: 'rgba(0, 0, 0, .8)',
  onClose: null,
  unmount: null,
  cover: false, //透明遮罩层
  coverColor: 'rgba(0, 0, 0, 0)',
  closeOnClickOverlay: false,
}

let idsMap: string[] = []

let optsMap: any[] = []

const clearToast = (id?: string) => {
  if (id) {
    const container = document.getElementById(id)
    optsMap = optsMap.filter((item) => item.id !== id)
    idsMap = idsMap.filter((item) => item !== id)
    if (container) {
      document.body.removeChild(container)
    }
  } else {
    idsMap.forEach((item) => {
      const container = document.getElementById(item)
      if (container) {
        document.body.removeChild(container)
      }
    })
    optsMap = []
    idsMap = []
  }
}

const updateToast = (opts: any) => {
  const container = document.getElementById(opts.id)
  if (container) {
    const currentOpt = optsMap.find((item) => item.id === opts.id)
    if (currentOpt) {
      opts = { ...defaultOptions, ...currentOpt, ...opts }
    } else {
      opts = { ...defaultOptions, ...opts }
    }
    const instance = createVNode(Toast, opts)
    render(instance, container)
    return instance.component?.appContext
  }
}
const mountToast = (opts: any) => {
  let _id
  if (opts.id) {
    _id = opts.id
    if (idsMap.find((item) => item === opts.id)) {
      return updateToast(opts)
    }
  } else {
    _id = new Date().getTime() + ''
  }
  opts = { ...defaultOptions, ...opts }
  opts.id = _id
  idsMap.push(opts.id)
  optsMap.push(opts)
  const container = document.createElement('div')
  container.id = opts.id
  const instance = createVNode(Toast, opts)
  render(instance, container)
  document.body.appendChild(container)
  return instance.component?.appContext
}

const validateMessage = (message: string) => {
  if (!message) {
    console.warn('VowUI Toast:message不能为空')
    return
  }
}

export const ToastFunction = {
  text(message: string, opts = {}): AppContext | undefined {
    validateMessage(message)
    return mountToast({ ...opts, type: 'text', message })
  },
  success(message: string, opts = {}): AppContext | undefined {
    validateMessage(message)
    return mountToast({ icon: 'success', ...opts, message, type: 'success' })
  },
  fail(message: string, opts = {}): AppContext | undefined {
    validateMessage(message)
    return mountToast({ icon: 'failure', ...opts, message, type: 'fail' })
  },
  warn(message: string, opts = {}): AppContext | undefined {
    validateMessage(message)
    return mountToast({ icon: 'tips', ...opts, message, type: 'warn' })
  },
  loading(message: string, opts = {}): AppContext | undefined {
    return mountToast({
      icon: 'loading',
      ...opts,
      message,
      type: 'loading',
    })
  },
  hide(id?: string): void {
    clearToast(id)
  },
  install(app: App): void {
    app.use(Toast)
    app.config.globalProperties.$toast = ToastFunction
  },
}
