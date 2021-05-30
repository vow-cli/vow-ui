/*
 * @Author: genfa.zeng
 * @Date: 2021-05-16 11:53:48
 * @LastEditors: genfa.zeng
 * @LastEditTime: 2021-05-30 17:06:47
 * @Description:
 */
import { App } from 'vue'
import InfiniteLoading from './packages/mobile/infiniteLoading/index'
import Icon from './packages/mobile/icon/index'

function install(app: App): void {
  const packages = [InfiniteLoading, Icon]
  packages.forEach((component) => {
    if (component.install) {
      app.use(component)
    } else if (component.name) {
      app.component(component.name, component)
    }
  })
}

export { InfiniteLoading, Icon }

export default { install, version: '1.0.0' }
