const faker = require('faker')
faker.locale = 'zh_CN'

module.exports = {
  api: '/mock/user/address/get/by-id?:id',
  response: function (req, res) {
    let addressId =  new Number(req.query.addressId);
    if (addressId) {
      res.json({
        "rc": 1,
        "address": {
          "id": faker.random.uuid(),
          "name": faker.name.findName(),
          "phone": faker.phone.phoneNumber(),
          "area": ['330000', '330100', '330102'],
          "areaRaw": ['浙江省', '杭州市', '上城区'],
          "address": faker.address.streetAddress()
        }
      })
    } else {
      res.json({
        success: 'true',
        msg: 'ok',
        data: {}
      })
    }
  }
}
