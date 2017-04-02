/**
 * Created by alphabeta on 17-3-30.
 */

import fecha from 'fecha'

/**
 * 日期辅助类
 * @type {{format: (function(*=, *=): *)}}
 */
const dateUtil = {

  /**
   * 格式化日期时间，使用fecha插件
   * @param dateObj
   * @param format
   * @param pattern
   * @returns {*}
   */
  format (dateObj, format, pattern) {
    if (Object.prototype.toString.call(dateObj) === '[object Date]') {
      return fecha.format(dateObj, fecha.masks[format] || format)
    } else if (Object.prototype.toString.call(dateObj) === '[object String]') {
      try {
        if (pattern) {
          return fecha.format(this.dateParse(dateObj, pattern), fecha.masks[format] || format)
        } else {
          return fecha.format(dateObj, fecha.masks[format] || format)
        }
      } catch (e) {
        console.warn('Warning, can not format date.')
        return dateObj
      }
    } else if (Object.prototype.toString.call(dateObj) === '[object Number]') {
      return fecha.format(new Date(dateObj), fecha.masks[format] || format)
    } else {
      console.warn('Warning, can not format date.')
      return dateObj
    }
  },

  /**
   * 将非日期时间对象转换为日期时间，使用fecha插件
   * @param dateObj
   * @param pattern
   * @returns {*}
   */
  parse (dateObj, pattern) {
    if (Object.prototype.toString.call(dateObj) === '[object Date]') {
      return dateObj
    } else if (Object.prototype.toString.call(dateObj) === '[object String]') {
      try {
        return fecha.parse(dateObj, fecha.masks[pattern] || pattern)
      } catch (e) {
        console.warn('Warning, can not parse date object.')
        return dateObj
      }
    } else if (Object.prototype.toString.call(dateObj) === '[object Number]') {
      return new Date(dateObj)
    } else {
      console.warn('Warning, can not parse date object.')
      return dateObj
    }
  }
}

export default dateUtil
