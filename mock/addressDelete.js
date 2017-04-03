const faker = require('faker')
faker.locale = 'zh_CN'

module.exports = {
  api: '/mock/user/address/delete?:id',
  response: function (req, res) {
    res.json({
      success: 'true',
      msg: 'ok',
      data: {}
    })
  }
}
