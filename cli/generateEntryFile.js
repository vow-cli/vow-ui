/*
 * @Author: genfa.zeng
 * @Date: 2021-06-26 16:25:48
 * @Description:根据配置动态创建组件库入口文件:vow-ui.ts
 */
const pkg = require('../package.json')
const config = require('../src/config.json')
const path = require('path')
const fse = require('fs-extra')
const log = require('npmlog')
let importStr = `import { App } from 'vue'\n`
const packages = []
config.nav.map((item) => {
  item.packages.forEach((element) => {
    const { name, show } = element
    if (show) {
      importStr += `import ${name} from './packages/mobile/${name.toLowerCase()}/src/index.vue'\n`
      packages.push(name)
    }
  })
})

const installFunction = `function install(app: App): void {
  const packages = [${packages.join(', ')}]
  packages.forEach((component) => {
    if (component.install) {
      app.use(component)
    } else if (component.name) {
      app.component(component.name, component)
    }
  })
}`

const fileContent = `${importStr}
${installFunction}
export { ${packages.join(', ')} }
export default { install, version: '${pkg.version}' }
`
fse.outputFile(path.resolve(__dirname, '../src/vow-ui.ts'), fileContent, 'utf8', (err) => {
  log.info('入口文件: vow-ui.ts 生成成功')
})
