const faker = require('faker')
faker.locale = 'zh_CN'

module.exports = {
  api: '/mock/user/gift/gainDetail?:id',
  response: function (req, res) {
    let giftId =  new Number(req.query.giftId);

    res.json({
      "rc": 1,
      "detail": {
        "id": 1,
        "gainTime": "2017-03-24 09:49:08",
        "goodsName": "大礼包",
        "goodsPrice": "56",
        "nickName": "宝儿金",
        "headImg": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=",
        "shareCode": "06c2c01b6eed435d9b36f8ff1db9d0f896652035",
        "isDelivered": 1,
        "giftSource": 0
      }
    })
  }
}
