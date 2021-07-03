/*
 * @Author: genfa.zeng
 * @Date: 2021-07-03 16:08:06
 * @Description:
 */
import { App } from 'vue'
import { SFCWithInstall } from '@/utils/types'
import componentName from './src/index.vue'

componentName.install = (app: App): void => {
  app.component(componentName.name, componentName)
}

const _componentName: SFCWithInstall<typeof componentName> = componentName

export default _componentName
