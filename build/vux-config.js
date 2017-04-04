'use strict'

const path = require('path')
const fs = require('fs')
const demoPath = path.resolve(__dirname, '../src/component_list.json')

const argv = require('yargs').argv
argv.simulate = argv.simulate || false

module.exports = {
  plugins: [
    'vux-ui', 'inline-manifest', 'progress-bar',
  /*  {
      name: 'js-parser',
      test: /main\.js/,
      fn: function (source) {
        this.addDependency(demoPath)
        let list = fs.readFileSync(demoPath, 'utf-8')
        list = JSON.parse(list)
        let str = []
        list.forEach(one => {
          let filename = one
          let path = `/component/${toDash(one)}`
          if (/#/.test(one)) {
            filename = one.split('#')[0]
            path = one.split('#')[1]
          }
          str.push(`{
            path: '${path}',
            component: function (resolve) {
              require(['./components/${filename}.vue'], resolve)
            }
          }`)
        })
        str = `[${str.join(',\n')}]`
        source = source.replace('const routes = []', 'const routes = ' + str)
        console.log(source)
        return source
      }
    },*/
    {
      name: 'duplicate-style'
    }
  ]
}

function toDash(str) {
  return str.replace(/([A-Z])/g, function (m, w) {
    return '-' + w.toLowerCase();
  }).replace('-', '')
}
