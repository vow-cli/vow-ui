/*
 * @Author: genfa.zeng
 * @Date: 2021-05-16 11:53:48
 * @LastEditors: genfa.zeng
 * @LastEditTime: 2021-05-16 14:18:48
 * @Description: 
 */
import { App } from 'vue'
import Avatar from './packages/avatar/index.vue'

function install(app:App){
  const packages = [Avatar]
  packages.forEach((item:any)=>{
    if(item.install){
      app.use(item)
    } else if(item.name){
      app.component(item.name,item)
    }
  })
}

export {Avatar}

export default {install,version:"1.0.0"}