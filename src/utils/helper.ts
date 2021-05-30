/*
 * @Author: genfa.zeng
 * @Date: 2021-05-30 16:52:33
 * @LastEditors: genfa.zeng
 * @LastEditTime: 2021-05-30 16:53:15
 * @Description:
 */
/**
 * @description: 10 -> 10px
 * @param {string} value
 * @return {*}
 */
export const pxCheck = (value: string | number): string => {
  return isNaN(Number(value)) ? String(value) : `${value}px`
}
