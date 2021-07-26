/*
 * @Author: genfa.zeng
 * @Date: 2021-07-03 16:08:06
 * @Description:
 */
import { App } from 'vue'
import { SFCWithInstall } from '@/utils/types'
import StickyItem from './src/index.vue'

StickyItem.install = (app: App): void => {
  app.component(StickyItem.name, StickyItem)
}

const _StickyItem: SFCWithInstall<typeof StickyItem> = StickyItem

export default _StickyItem
