const qs = require('qs')
const Mock = require('mockjs')
const config = require('../config/config')
const { api } = config


const userPermission = {
  GUEST: [
    'dashboard',
  ],
  ADMIN: [
    'dashboard', 'space'
  ]
};

const adminUsers = [
  {
    id: 0,
    username: 'admin',
    password: 'admin',
    permissions: userPermission.ADMIN,
  }, {
    id: 1,
    username: 'guest',
    password: 'guest',
    permissions: userPermission.GUEST,
  }
];

module.exports = {

  [`POST ${api.sessionLogin}`] (req, res) {
    const { username, password } = req.body
    const user = adminUsers.filter((item) => item.username === username)

    if (user.length > 0 && user[0].password === password) {
      const now = new Date()
      now.setDate(now.getDate() + 1)
      res.cookie('token', JSON.stringify({ id: user[0].id, deadline: now.getTime() }), {
        maxAge: 900000,
        httpOnly: true,
      })
      res.json({ success: true, message: 'Ok' })
    } else {
      res.json({ success: false, message: '用户名或密码错误！' });
    }
  },

  [`POST ${api.sessionLogout}`] (req, res) {
    res.clearCookie('token')
    res.json({success: true});
  },

  [`GET ${api.sessionQuery}`] (req, res) {
    const cookie = req.headers.cookie || ''
    const cookies = qs.parse(cookie.replace(/\s/g, ''), { delimiter: ';' })
    const response = {}
    const user = {}
    if (!cookies.token) {
      res.status(400).send({ success: false, message: '登陆已过期,请重新登陆！'});
      return
    }
    const token = JSON.parse(cookies.token)
    if (token) {
      response.success = token.deadline > new Date().getTime()
    }
    if (response.success) {
      const userItem = adminUsers.filter(_ => _.id === token.id)
      if (userItem.length > 0) {
        user.permissions = userItem[0].permissions
        user.username = userItem[0].username
        user.id = userItem[0].id
      }
    }
    response.user = user
    res.json(response)
  }
}
