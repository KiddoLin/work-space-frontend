const qs = require('qs')
const Mock = require('mockjs')
const config = require('../config/config')
const { apiPrefix } = config

let userListData = Mock.mock({
  'data|8-20': [
    {
      id: '@increment',
      username: '@cname',
      type: '@integer(0,1)',
      space_id: 1,
      space_name: '@ctitle',
      telphone: /^1[34578]\d{9}$/,
      industry_id: 1,
      status: '@integer(0,1)',
      create_time: '@datetime'
    }
  ]
})


let database = userListData.data

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

  [`GET ${apiPrefix}/users`] (req, res) {
    const { query } = req;
    let { pageSize, page, ...other } = query;
    pageSize = pageSize || 10;
    page = page || 1;
    console.log(other);
    let newData = database;

    newData = newData.filter(item => {
      if(other.status && other.status!=item.status) return false;
      if(other.type && other.type!=0 && other.type!=item.type) return false;
      if(other.keyword && other.keyword!='' && item.username.indexOf(other.keyword)<0 && item.space_name.indexOf(other.keyword)<0 && item.telphone.indexOf(other.keyword)<0)return false;
      return true;
    });

    res.status(200).json({
      data: newData.slice((page - 1) * pageSize, page * pageSize),
      total: newData.length,
    });
  },


  // [`POST ${apiPrefix}/users`] (req, res) {
  //   const newData = req.body;
  //   newData.created_at = Mock.mock('@now');
  //   newData.status = 0;
  //   //newData.avatar = newData.avatar || Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', newData.nickName.substr(0, 1))
  //   newData.id = Mock.mock('@increment');

  //   database.unshift(newData)

  //   res.status(200).end()
  // },

  [`GET ${apiPrefix}/users/:id`] (req, res) {
    const { id } = req.params
    const data = queryArray(database, parseInt(id), 'id')
    if (data) {
      res.status(200).json({success: true, data: data});
    } else {
      res.status(200).json({success: false, message: '记录不存在'})
    }
  },

  // [`DELETE ${apiPrefix}/offices/:id`] (req, res) {
  //   const { id } = req.params
  //   const data = queryArray(database, id, 'id')
  //   if (data) {
  //     database = database.filter((item) => item.id !== id)
  //     res.status(204).end()
  //   } else {
  //     res.status(404).json(NOTFOUND)
  //   }
  // },

  // [`PUT ${apiPrefix}/users/:id`] (req, res) {
  //   const { id } = req.params
  //   console.log(typeof id)
  //   const editItem = req.body
  //   let isExist = false
  //   let updateItem = editItem;
  //   database = database.map((item) => {
  //     if (item.id == id) {
  //       isExist = true
  //       updateItem = Object.assign({}, item, editItem);
  //       return updateItem;
  //     }
  //     return item
  //   })

  //   if (isExist) {
  //     res.json({success: true, data: updateItem});
  //   } else {
  //     //res.status(404).json(NOTFOUND)
  //     res.status(200).json({success: false, message: '记录不存在'});
  //   }
  // },

    [`PATCH ${apiPrefix}/users/:id`] (req, res) {
    const { id } = req.params
    const {space_id, nextStatus} = req.body
    let isExist = false
    let updateItem = null;
    database = database.map((item) => {
      if (item.id == id) {
        isExist = true
        //item.updated_at = Mock.mock('@now')
        let obj = {}
        if(space_id){
          obj.space_id = space_id
          obj.type = space_id===0 ? 0 : 1;
          if(space_id===0) obj.space_name=''
        }
        if(nextStatus){
          obj.status = nextStatus
        }
        updateItem = Object.assign({}, item, obj);
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
