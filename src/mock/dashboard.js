import { color } from '../utils/theme'
const Mock = require('mockjs')
const config = require('../config/config')
const { apiPrefix } = config

const Dashboard = Mock.mock({
  numbers: [
    {
      icon: 'api',
      color: color.green,
      title: '孵化器',
      number: 10,
    }, {
      icon: 'appstore-o',
      color: color.blue,
      title: '办公室',
      number: 200,
    }, {
      icon: 'wallet',
      color: color.purple,
      title: '会议室',
      number: 340,
    }, {
      icon: 'tags-o',
      color: color.red,
      title: '订单总数',
      number: 4324,
    },
  ],
})

module.exports = {
  [`GET ${apiPrefix}/dashboard`] (req, res) {
    res.json(Dashboard)
  },
}
