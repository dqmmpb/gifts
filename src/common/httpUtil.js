/**
 * Created by alphabeta on 16-12-29.
 */

import Vue from 'vue'

import assignDeep from 'assign-deep'

// const basePath = '/gifts-api/'
const basePath = '/hongbao_local/'

function makeUrl (url) {
  if (url.startsWith('/')) {
    return url
  } else if (url.startsWith('http')) {
    return url
  } else {
    return `${basePath}${url}`
  }
}

/**
 * Http方法基类
 * @type {{get: (function(*=): (*|Promise.<T>))}}
 */
const Http = {

  /**
   * get method, 不处理data.body
   * @param url
   * @returns {*|Promise.<T>}
   */
  get (url) {
    return Vue.http.get(makeUrl(url))
  },

  /**
   * post method, 不处理data.body
   * @param url
   * @param param
   * @returns {*|Promise.<T>}
   */
  post (url, param, optioins) {
    let oo = assignDeep({}, {emulateJSON: true}, optioins)
    return Vue.http.post(makeUrl(url), param, oo)
  },

  /**
   * delete method, 不处理data.body
   * @param url
   * @returns {*}
   */
  delete (url) {
    return Vue.http.delete(makeUrl(url))
  }
}

export default Http
