const faker = require('faker')
faker.locale = 'zh_CN'

module.exports = {
  api: '/mock/user/addresslist/get',
  response: function (req, res) {
    res.json({
      "rc": 1,
      "list": [
        {
          "id": faker.random.uuid(),
          "name": faker.name.findName(),
          "phone": faker.phone.phoneNumber(),
          "area": ['330000', '330100', '330102'],
          "areaRaw": ['浙江省', '杭州市', '上城区'],
          "address": faker.address.streetAddress()
        }, {
          "id": faker.random.uuid(),
          "name": faker.name.findName(),
          "phone": faker.phone.phoneNumber(),
          "area": ['330000', '330100', '330106'],
          "areaRaw": ['浙江省', '杭州市', '西湖区'],
          "address": faker.address.streetAddress()
        }, {
          "id": faker.random.uuid(),
          "name": faker.name.findName(),
          "phone": faker.phone.phoneNumber(),
          "area": ['310000', '310100', '310101'],
          "areaRaw": ['上海市', '市辖区', '闵行区'],
          "address": faker.address.streetAddress()
        }
      ]
    })
  }
}
