/*
 * @Author: genfa.zeng
 * @Date: 2021-07-03 16:12:35
 * @Description:
 */
import { App } from 'vue'
import { SFCWithInstall } from '@/utils/types'
import Toast from './src/index.vue'

Toast.install = (app: App): void => {
  app.component(Toast.name, Toast)
}

const _Toast: SFCWithInstall<typeof Toast> = Toast

export default _Toast
