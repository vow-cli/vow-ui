import { App } from 'vue'
import Sticky from './packages/mobile/sticky/src/index.vue'
import StickyItem from './packages/mobile/stickyitem/src/index.vue'
import Toast from './packages/mobile/toast/src/index.vue'
import Icon from './packages/mobile/icon/src/index.vue'
import InfiniteLoading from './packages/mobile/infiniteloading/src/index.vue'

function install(app: App): void {
  const packages = [Sticky, StickyItem, Toast, Icon, InfiniteLoading]
  packages.forEach((component) => {
    if (component.install) {
      app.use(component)
    } else if (component.name) {
      app.component(component.name, component)
    }
  })
}
export { Sticky, StickyItem, Toast, Icon, InfiniteLoading }
export default { install, version: '0.0.2' }
