import { App } from 'vue'
import Icon from './packages/mobile/icon/index.vue'
import InfiniteLoading from './packages/mobile/infiniteloading/index.vue'

function install(app: App): void {
  const packages = [Icon, InfiniteLoading]
  packages.forEach((component) => {
    if (component.install) {
      app.use(component)
    } else if (component.name) {
      app.component(component.name, component)
    }
  })
}
export { Icon, InfiniteLoading }
export default { install, version: '0.0.2' }
