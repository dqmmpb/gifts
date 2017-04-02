const faker = require('faker')
faker.locale = 'zh_CN'

module.exports = {
  api: '/mock/address/add?:id',
  response: function (req, res) {
    let addressId =  new Number(req.query.addressId);
    console.log(req.query);
    if (addressId) {
      res.json({
        success: 'true',
        msg: 'ok',
        data: {
          id: faker.random.uuid(),
          name: faker.name.findName(),
          phone: faker.phone.phoneNumber(),
          state: ['330000', '330100', '330102'],
          stateRaw: ['浙江省', '杭州市', '上城区'],
          streetAddress: faker.address.streetAddress()
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
