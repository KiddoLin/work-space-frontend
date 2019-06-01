const qs = require('qs')
const Mock = require('mockjs')
const config = require('../config/config')
const { apiPrefix } = config

let meetingroomOrderListData = Mock.mock({
  'data|8-20': [
    {
      id: '@increment(1)',
      space_id: 1,
      space_name: '思微众创空间',
      office_id: 1,
      name: '@ctitle',
      category: '@integer(0,1)',
      price_per_hour: '@integer(100,1000)',
      year: 2017,
      month: 6,
      day: 1,
      start_time: 10,
      end_time: 12,
      total_hours: 5,
      discount: 1.0,
      payment_amount: 1223.2,
      contact_name: '@cname',
      contact_phone: /^1[34578]\d{9}$/,
      status: '@integer(0,3)',
      source: '@integer(0,1)',
      user_id: 1,
      created_at: '@datetime',
      canceled_at: '@datetime',
    }
  ]
})


let database = meetingroomOrderListData.data

const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null
  }
  let data

  for (let item of array) {
    if (item[keyAlias] === key) {
      data = item
      break
    }
  }

  if (data) {
    return data
  }
  return null
}

const NOTFOUND = {
  success: false,
  message: 'Not Found'
}

module.exports = {

  [`GET ${apiPrefix}/orders/meetingroom`] (req, res) {
    const { query } = req;
    let { pageSize, page, ...other } = query;
    pageSize = pageSize || 10;
    page = page || 1;
    console.log(other);
    let newData = database;

    newData = newData.filter(item => {
      if(other.status && other.status!=item.status) return false;
      if(other.category && other.category!=0 && other.category!=item.category) return false;
      if(other.source && other.source!='' && other.source!=item.source) return false;
      if(other.keyword && other.keyword!='' && item.name.indexOf(other.keyword)<0 && item.name.indexOf(other.keyword)<0) return false;
      return true;
    });

    res.status(200).json({
      data: newData.slice((page - 1) * pageSize, page * pageSize),
      total: newData.length,
    });
  },


  [`GET ${apiPrefix}/orders/meetingroom/:id`] (req, res) {
    const { id } = req.params
    const data = queryArray(database, parseInt(id), 'id')
    if (data) {
      res.status(200).json({success: true, data: data});
    } else {
      res.status(200).json({success: false, message: '记录不存在'})
    }
  },
}
