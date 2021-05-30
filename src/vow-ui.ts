/*
 * @Author: genfa.zeng
 * @Date: 2021-05-16 11:53:48
 * @LastEditors: genfa.zeng
 * @LastEditTime: 2021-05-29 12:04:31
 * @Description:
 */
import { App } from 'vue'
import InfiniteLoading from './packages/mobile/infiniteLoading/src/index.vue'

function install(app: App): void {
  const packages = [InfiniteLoading]
  packages.forEach((component) => {
    if (component.install) {
      app.use(component)
    } else if (component.name) {
      app.component(component.name, component)
    }
  })
}

export { InfiniteLoading }

export default { install, version: '1.0.0' }
