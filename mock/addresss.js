const faker = require('faker')
faker.locale = 'zh_CN'

module.exports = {
  api: '/mock/address/query',
  response: function (req, res) {
    res.json({
      success: 'true',
      msg: 'ok',
      data: [
        {
          id: faker.random.uuid(),
          name: faker.name.findName(),
          phone: faker.phone.phoneNumber(),
          state: ['330000', '330100', '330102'],
          stateRaw: ['浙江省', '杭州市', '上城区'],
          streetAddress: faker.address.streetAddress()
        }, {
          id: faker.random.uuid(),
          name: faker.name.findName(),
          phone: faker.phone.phoneNumber(),
          state: ['330000', '330100', '330106'],
          stateRaw: ['浙江省', '杭州市', '西湖区'],
          streetAddress: faker.address.streetAddress()
        }, {
          id: faker.random.uuid(),
          name: faker.name.findName(),
          phone: faker.phone.phoneNumber(),
          state: ['310000', '310100', '310101'],
          stateRaw: ['上海市', '市辖区', '闵行区'],
          streetAddress: faker.address.streetAddress()
        }
      ]
    })
  }
}
