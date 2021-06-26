/*
 * @Author: genfa.zeng
 * @Date: 2021-06-26 17:10:31
 * @Description:通过命令创建组件
 */
const inquirer = require('inquirer')
const path = require('path')
const fse = require('fs-extra')
const config = require('../src/config.json')
const log = require('npmlog')
const nav = config.nav
const packagesDirPath = path.resolve(__dirname, '../src/packages/mobile')
const templateDirPath = path.resolve(__dirname, './componentTemplate')
//组件创建信息
const componentInfo = {
  name: '',
  type: '',
  title: '',
  desc: '',
  show: true,
  author: '',
}

/**
 * @description: 校验组件是否已存在
 * @param {*}
 * @return {*}
 */
function componentIsExist(name) {
  let repeat = false
  const componentNames = []
  nav.forEach((navItem) => {
    navItem.packages.forEach((component) => {
      componentNames.push(component.name)
    })
  })
  repeat = componentNames.includes(name)
  if (repeat) {
    return '该组件已存在'
  }
  const pass = name && name.match(/^[A-Z]/)
  if (pass) {
    return true
  }
  return '组件名不能为空,且组件名首字母必须大写,如TextBox'
}

/**
 * @description: 校验组件中文名
 * @param {*} title：输入的组件中文名
 * @return {*}
 */
function validateComponentTtitle(title) {
  const pass = title && title.length <= 10
  if (pass) return true
  return '组件中文名不能为空且不能超过十个字符'
}

/**
 * @description: 收集创建组件的信息
 * @param {*}
 * @return {*}
 */
async function collectionComponentInfo() {
  const promptConfig = [
    { type: 'input', name: 'name', message: '组件名', validate: componentIsExist },
    {
      type: 'input',
      name: 'title',
      message: '组件中文名(十个字以内)',
      validate: validateComponentTtitle,
    },
    {
      type: 'input',
      name: 'desc',
      message: '组件描述(五十字以内)',
    },
    {
      type: 'rawlist',
      name: 'sort',
      message: '请选择组件分类',
      choices: ['布局组件', '操作反馈', '基础组件', '导航组件', '数据录入', '业务组件'],
    },
    {
      type: 'input',
      name: 'author',
      message: '组件作者',
    },
  ]
  const answers = await inquirer.prompt(promptConfig)
  return Object.assign(componentInfo, answers)
}

/**
 * @description: 创建对应的组件文件及文件夹
 * @param {*}
 * @return {*}
 */
function createComponentFiles({ name }) {
  const dirName = name.toLowerCase()
  const dirPath = path.resolve(packagesDirPath, dirName)
  //从cli/componentTemplate拷贝一份到对应目录下
  fse.copySync(templateDirPath, dirPath)
  //TODO:重新生成文件的内容
}

/**
 * @description:更新config.json文件
 * @param {*}
 * @return {*}
 */
function updateConfigJSON(componentInfo) {
  const { sort } = componentInfo
  const currentSort = config.nav.filter((navItem) => navItem.name === sort)[0]
  currentSort.packages.push(componentInfo)
  const fileContent = JSON.stringify(config, null, 2)
  const filePath = path.resolve(__dirname, '../src/config.json')
  fse.writeFileSync(filePath, fileContent)
}

async function createComponent() {
  let componentInfo = await collectionComponentInfo()
  createComponentFiles(componentInfo)
  updateConfigJSON(componentInfo)
  log.info('组件模板生成完毕~')
}

createComponent()
