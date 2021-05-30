/*
 * @Author: genfa.zeng
 * @Date: 2021-05-29 11:57:23
 * @LastEditors: genfa.zeng
 * @LastEditTime: 2021-05-29 11:58:54
 * @Description:
 */
const ua = navigator.userAgent.toLowerCase()
const isMobile = /ios|iphone|ipod|ipad|android/.test(ua)

export { isMobile }
