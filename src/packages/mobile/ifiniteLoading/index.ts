import { App } from 'vue'
import { SFCWithInstall } from '@/utils/types'
import InfinitLoading from './src/index.vue'

InfinitLoading.install = (app: App): void => {
  app.component(InfinitLoading.name, InfinitLoading)
}

const _InfinitLoading: SFCWithInstall<typeof InfinitLoading> = InfinitLoading

export default _InfinitLoading
