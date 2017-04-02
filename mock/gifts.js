const faker = require('faker')
faker.locale = 'zh_CN'

module.exports = {
  api: '/mock/gift/receive/query',
  response: function (req, res) {
    res.json({
      success: 'true',
      msg: 'ok',
      data: [
        {
          id: faker.random.uuid(),
          orderNo: faker.random.number(),
          name: faker.name.findName(),
          phone: faker.phone.phoneNumber(),
          address: {
            id: faker.random.uuid(),
            name: faker.name.findName(),
            phone: faker.phone.phoneNumber(),
            state: ['330000', '330100', '330102'],
            stateRaw: ['浙江省', '杭州市', '上城区'],
            streetAddress: faker.address.streetAddress()
          },
          date: faker.date.recent(),
          type: '礼包',
          status: 1,
          gifts: [
            {
              gift: '浮点颗粒',
              num: faker.random.number({min:1, max: 3})
            }, {
              gift: '超凡持久',
              num: faker.random.number({min:1, max: 3})
            }
          ],
          money: faker.finance.amount()
        }, {
          id: faker.random.uuid(),
          orderNo: faker.random.number(),
          name: faker.name.findName(),
          phone: faker.phone.phoneNumber(),
          address: {
            id: faker.random.uuid(),
            name: faker.name.findName(),
            phone: faker.phone.phoneNumber(),
            state: ['330000', '330100', '330102'],
            stateRaw: ['浙江省', '杭州市', '上城区'],
            streetAddress: faker.address.streetAddress()
          },
          date: faker.date.recent(),
          type: '赠送',
          status: 2,
          gifts: [
            {
              gift: '浮点颗粒',
              num: faker.random.number({min:1, max: 3})
            }
          ],
          money: faker.finance.amount()
        }, {
          id: faker.random.uuid(),
          orderNo: faker.random.number(),
          name: faker.name.findName(),
          phone: faker.phone.phoneNumber(),
          address: {
            id: faker.random.uuid(),
            name: faker.name.findName(),
            phone: faker.phone.phoneNumber(),
            state: ['330000', '330100', '330102'],
            stateRaw: ['浙江省', '杭州市', '上城区'],
            streetAddress: faker.address.streetAddress()
          },
          date: faker.date.recent(),
          type: '赠送',
          status: 3,
          gifts: [
            {
              gift: '浮点颗粒',
              num: faker.random.number({min:1, max: 3})
            }
          ],
          money: faker.finance.amount()
        }, {
          id: faker.random.uuid(),
          orderNo: faker.random.number(),
          name: faker.name.findName(),
          phone: faker.phone.phoneNumber(),
          address: {
            id: faker.random.uuid(),
            name: faker.name.findName(),
            phone: faker.phone.phoneNumber(),
            state: ['330000', '330100', '330102'],
            stateRaw: ['浙江省', '杭州市', '上城区'],
            streetAddress: faker.address.streetAddress()
          },
          date: faker.date.recent(),
          type: '赠送',
          status: 4,
          gifts: [
            {
              gift: '浮点颗粒',
              num: faker.random.number({min:1, max: 3})
            }
          ],
          money: faker.finance.amount()
        }
      ],
      currentPage: new Number(req.query.pageIndex),
      totalCount: 4
    })
  }
}
