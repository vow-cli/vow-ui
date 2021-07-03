import { App } from 'vue'
import Toast from './packages/mobile/toast/src/index.vue'
import Icon from './packages/mobile/icon/src/index.vue'
import InfiniteLoading from './packages/mobile/infiniteloading/src/index.vue'

function install(app: App): void {
  const packages = [Toast, Icon, InfiniteLoading]
  packages.forEach((component) => {
    if (component.install) {
      app.use(component)
    } else if (component.name) {
      app.component(component.name, component)
    }
  })
}
export { Toast, Icon, InfiniteLoading }
export default { install, version: '0.0.2' }
