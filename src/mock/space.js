const qs = require('qs')
const Mock = require('mockjs')
const config = require('../config/config')
const { apiPrefix } = config

let spaceListData = Mock.mock({
  'data|8-20': [
    {
      id: '@increment',
      name: '@ctitle',
      category: '@integer(0,6)',
      industry: ['互联网', '房地产'],
      tags: '',
      summary: '@csentence(5,15)',
      office_intro: '@csentence(30,100)',
      meetingrm_intro: '@csentence(30,100)',
      pictures: [
        { uid:0, url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'},
        { uid:1, url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'}
      ],
      operation_time_workday: '9:00-18:00',
      operation_time_nonworkday:'9:00-14:00',
      telephone: /^1[34578]\d{9}$/,
      _pre_addr: '@county(true)',
      province: function() {return this._pre_addr.split(' ')[0]},
      city: function() {return this._pre_addr.split(' ')[1]},
      district: function() {return this._pre_addr.split(' ')[2]},
      zone: '软件产业基地',
      address: '软件产业基地5E-501D',
      latitude: 103.497764,
      longitude: 34.891620,
      area_in_sqm: '@integer(500,10000)',
      num_of_fixed_desk: 1,
      num_of_nonfixed_desk: 2,
      num_of_office_room: 2,
      num_of_meeting_room: 3,
      num_of_event_room: 4,
      facilities: [],
      status: '@integer(0,1)',
      updated_at: '@datetime',
      created_at: '@datetime'
    },
  ],
})


let database = spaceListData.data

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

  [`GET ${apiPrefix}/spaces`] (req, res) {
    const { query } = req;
    let { pageSize, page, select, ...other } = query;
    pageSize = pageSize || 10;
    page = page || 1;
    console.log(other);
    let newData = database;

    newData = newData.filter(item => {
      if(other.status && other.status!=item.status) return false;
      if(other.category && other.category!='' && other.category!=item.category) return false;
      if(other.keyword && other.keyword!='' && item.name.indexOf(other.keyword)<0 && item.industry.indexOf(other.keyword)<0) return false;
      return true;
    });

    if(select){
      let keys = select.split(',');
      newData = newData.map((item)=>{
         let newItem = {};
         keys.forEach((key) => {
            if(item.hasOwnProperty(key))
              newItem[key]=item[key];
         });
         return newItem;
      })
    }

    res.status(200).json({
      success: true,
      data: newData.slice((page - 1) * pageSize, page * pageSize),
      total: newData.length,
    });
  },

  [`POST ${apiPrefix}/spaces`] (req, res) {
    const newData = req.body;
    newData.created_at = Mock.mock('@now');
    newData.status = 0;
    //newData.avatar = newData.avatar || Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', newData.nickName.substr(0, 1))
    newData.id = Mock.mock('@increment');

    database.unshift(newData)

    res.status(200).end()
  },

  [`GET ${apiPrefix}/spaces/:id`] (req, res) {
    const { id } = req.params
    const data = queryArray(database, parseInt(id), 'id')
    if (data) {
      res.status(200).json({success: true, data: data});
    } else {
      res.status(200).json({success: false, message: '记录不存在'})
    }
  },

  [`DELETE ${apiPrefix}/spaces/:id`] (req, res) {
    const { id } = req.params
    const data = queryArray(database, id, 'id')
    if (data) {
      database = database.filter((item) => item.id !== id)
      res.status(204).end()
    } else {
      res.status(404).json(NOTFOUND)
    }
  },

  [`PUT ${apiPrefix}/spaces/:id`] (req, res) {
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

  [`PATCH ${apiPrefix}/spaces/:id`] (req, res) {
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
