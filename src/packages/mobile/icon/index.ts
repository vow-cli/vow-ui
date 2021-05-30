/*
 * @Author: genfa.zeng
 * @Date: 2021-05-30 17:01:25
 * @LastEditors: genfa.zeng
 * @LastEditTime: 2021-05-30 17:02:41
 * @Description:
 */
import { App } from 'vue'
import { SFCWithInstall } from '@/utils/types'
import Icon from './src/index.vue'

Icon.install = (app: App): void => {
  app.component(Icon.name, Icon)
}

const _Icon: SFCWithInstall<typeof Icon> = Icon

export default _Icon
