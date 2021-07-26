/*
 * @Author: genfa.zeng
 * @Date: 2021-07-03 16:08:06
 * @Description:
 */
import { App } from 'vue'
import { SFCWithInstall } from '@/utils/types'
import Sticky from './src/index.vue'

Sticky.install = (app: App): void => {
  app.component(Sticky.name, Sticky)
}

const _Sticky: SFCWithInstall<typeof Sticky> = Sticky

export default _Sticky
