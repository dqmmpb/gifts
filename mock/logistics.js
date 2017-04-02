const faker = require('faker')
faker.locale = 'zh_CN'

module.exports = {
  api: '/mock/logistics/query?:id',
  response: function (req, res) {
    res.json({
      success: 'true',
      msg: 'ok',
      data: {
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
        status: '已发货',
        money: faker.finance.amount(),
        logistics: [
          {
            id: faker.random.uuid(),
            name: '正在派送，派件人：' + faker.name.findName() + '，电话：' + faker.phone.phoneNumber(),
            date: faker.date.recent(),
            area: '杭州市'
          }, {
            id: faker.random.uuid(),
            name: '到达城西分公司，来自杭州分拨',
            date: faker.date.recent(),
            area: '杭州市'
          }, {
            id: faker.random.uuid(),
            name: '从杭州分拨离开，发往城西分公司',
            date: faker.date.recent(),
            area: '杭州分拨'
          }, {
            id: faker.random.uuid(),
            name: '到达杭州分拨，来自宁波集散',
            date: faker.date.recent(),
            area: '杭州分拨'
          }, {
            id: faker.random.uuid(),
            name: '从宁波集散出发，发往杭州分拨',
            date: faker.date.recent(),
            area: '宁波集散'
          }, {
            id: faker.random.uuid(),
            name: '已揽收',
            date: faker.date.recent(),
            area: '宁波市'
          }
        ]
      }
    })
  }
}
