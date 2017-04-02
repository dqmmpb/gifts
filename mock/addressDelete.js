const faker = require('faker')
faker.locale = 'zh_CN'

module.exports = {
  api: '/mock/address/delete?:id',
  response: function (req, res) {
    res.json({
      success: 'true',
      msg: 'ok',
      data: {}
    })
  }
}
