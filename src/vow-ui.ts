import { App } from 'vue'
import Avatar from './packages/avatar/index.vue'

function install(app: App): void {
  const packages = [Avatar]
  packages.forEach((component) => {
    if (component.install) {
      app.use(component)
    } else if (component.name) {
      app.component(component.name, component)
    }
  })
}

export { Avatar }

export default { install, version: '1.0.0' }
