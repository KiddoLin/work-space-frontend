const qs = require('qs')
const Mock = require('mockjs')
const config = require('../config/config')
const { apiPrefix } = config

let officeListData = Mock.mock({
  'data|8-20': [
    {
      id: '@increment',
      name: '@ctitle',
      category: '@integer(0,2)',
      space_id: 1,
      space_name: '@ctitle',
      picture: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      price_per_day: '@integer(100,1000)',
      num_of_unit: '@integer(5,40)',
      tags: [],
      status: '@integer(0,1)',
      updated_at: '@datetime',
      created_at: '@datetime'
    }
  ]
})


let database = officeListData.data

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

  [`GET ${apiPrefix}/offices`] (req, res) {
    const { query } = req;
    let { pageSize, page, ...other } = query;
    pageSize = pageSize || 10;
    page = page || 1;
    console.log(other);
    let newData = database;

    newData = newData.filter(item => {
      if(other.status && other.status!=item.status) return false;
      if(other.category && other.category!=0 && other.category!=item.category) return false;
      if(other.keyword && other.keyword!='' && item.name.indexOf(other.keyword)<0 && item.space_name.indexOf(other.keyword)<0) return false;
      return true;
    });

    res.status(200).json({
      data: newData.slice((page - 1) * pageSize, page * pageSize),
      total: newData.length,
    });
  },


  [`POST ${apiPrefix}/offices`] (req, res) {
    const newData = req.body;
    newData.created_at = Mock.mock('@now');
    newData.status = 0;
    //newData.avatar = newData.avatar || Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', newData.nickName.substr(0, 1))
    newData.id = Mock.mock('@increment');

    database.unshift(newData)

    res.status(200).end()
  },

  [`GET ${apiPrefix}/offices/:id`] (req, res) {
    const { id } = req.params
    const data = queryArray(database, parseInt(id), 'id')
    if (data) {
      res.status(200).json({success: true, data: data});
    } else {
      res.status(200).json({success: false, message: '记录不存在'})
    }
  },

  [`DELETE ${apiPrefix}/offices/:id`] (req, res) {
    const { id } = req.params
    const data = queryArray(database, id, 'id')
    if (data) {
      database = database.filter((item) => item.id !== id)
      res.status(204).end()
    } else {
      res.status(404).json(NOTFOUND)
    }
  },

  [`PUT ${apiPrefix}/offices/:id`] (req, res) {
    const { id } = req.params
    console.log(typeof id)
    const editItem = req.body
    let isExist = false
    let updateItem = editItem;
    database = database.map((item) => {
      if (item.id == id) {
        isExist = true
        updateItem = Object.assign({}, item, editItem);
        return updateItem;
      }
      return item
    })

    if (isExist) {
      res.json({success: true, data: updateItem});
    } else {
      //res.status(404).json(NOTFOUND)
      res.status(200).json({success: false, message: '记录不存在'});
    }
  },

    [`PATCH ${apiPrefix}/offices/:id`] (req, res) {
    const { id } = req.params
    const {nextStatus} = req.body
    let isExist = false
    let updateItem = null;
    database = database.map((item) => {
      if (item.id == id) {
        isExist = true
        item.updated_at = Mock.mock('@now')
        updateItem = Object.assign({}, item, {status: nextStatus});
        return updateItem;
      }
      return item
    })

    if (isExist) {
      res.json({success: true, data: updateItem});
    } else {
      //res.status(404).json(NOTFOUND)
      res.status(200).json({success: false, message: '记录不存在'});
    }
  },
}
