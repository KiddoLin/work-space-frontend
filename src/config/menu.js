module.exports = [
  {
    id: 1,
    icon: 'laptop',
    name: '首页',
    router: '/dashboard',
  },
  {
    id: 2,
    bpid: 1,
    name: '孵化器管理',
    icon: 'api',
    router: '/spaces',
  },
  {
    id: 20,
    mpid: -1,
    bpid: 2,
    name: '创建',
    router: '/spaces/create',
  },
  {
    id: 21,
    mpid: -1,
    bpid: 2,
    name: '详情',
    router: '/spaces/:id',
  },
  {
    id: 22,
    mpid: -1,
    bpid: 2,
    name: '编辑',
    router: '/spaces/:id/edit',
  },
  {
    id: 3,
    bpid: 1,
    name: '场地管理',
    icon: 'home',
  },
   {
    id: 30,
    bpid: 3,
    mpid: 3,
    name: '办公场地',
    icon: 'appstore-o',
    router: '/offices',
  },
    {
    id: 300,
    mpid: -1,
    bpid: 30,
    name: '创建',
    router: '/offices/create',
  },
  {
    id: 301,
    mpid: -1,
    bpid: 30,
    name: '详情',
    router: '/offices/:id',
  },
  {
    id: 302,
    mpid: -1,
    bpid: 30,
    name: '编辑',
    router: '/offices/:id/edit',
  },

  {
    id: 31,
    bpid: 3,
    mpid: 3,
    name: '会议与活动场地',
    icon: 'wallet',
    router: '/meetingrooms',
  },
    {
    id: 310,
    mpid: -1,
    bpid: 31,
    name: '创建',
    router: '/meetingrooms/create',
  },
  {
    id: 311,
    mpid: -1,
    bpid: 31,
    name: '详情',
    router: '/meetingrooms/:id',
  },
  {
    id: 312,
    mpid: -1,
    bpid: 31,
    name: '编辑',
    router: '/meetingrooms/:id/edit',
  },
  {
    id: 4,
    bpid: 1,
    name: '订单管理',
    icon: 'tags-o',
  },
  {
    id: 40,
    bpid: 4,
    mpid: 4,
    name: '办公场地订单',
    icon: 'appstore-o',
    router: '/orders/office',
  },
  {
    id: 401,
    bpid: 40,
    mpid: -1,
    name: '订单详情',
    router: '/orders/office/:id',
  },
  {
    id: 41,
    bpid: 4,
    mpid: 4,
    name: '会议与活动场地订单',
    icon: 'wallet',
    router: '/orders/meetingroom',
  },
  {
    id: 411,
    bpid: 41,
    mpid: -1,
    name: '订单详情',
    router: '/orders/meetingroom/:id',
  },

  {
    id: 42,
    bpid: 4,
    mpid: 4,
    name: '促销活动订单',
    icon: 'gift',
    router: '/orders/promotion',
  },
  {
    id: 421,
    bpid: 42,
    mpid: -1,
    name: '订单详情',
    router: '/orders/promotion/:id',
  },

  {
    id: 7,
    bpid: 1,
    name: '预约管理',
    icon: 'clock-circle-o',
    router: '/appointments',
  },
  {
    id: 8,
    bpid: 1,
    name: '促销活动',
    icon: 'gift',
    router: '/promotions',
  },
  {
    id: 80,
    bpid: 8,
    mpid: -1,
    name: '创建',
    router: '/promotions/create',
  },
  {
    id: 81,
    bpid: 8,
    mpid: -1,
    name: '详情',
    router: '/promotions/:id',
  },
  {
    id: 82,
    bpid: 8,
    mpid: -1,
    name: '编辑',
    router: '/promotions/:id/edit',
  },
  {
    id: 6,
    bpid: 1,
    name: '财务管理',
    icon: 'pay-circle-o',
  },
  {
    id: 60,
    bpid: 6,
    mpid: 6,
    name: '交易流水',
    icon: 'database',
    router: '/money_transes',
  },
  {
    id: 5,
    bpid: 1,
    name: '系统管理',
    icon: 'tool'
  },
  {
    id: 50,
    bpid: 5,
    mpid: 5,
    name: '用户管理',
    icon: 'team',
    router: '/users',
  },
  {
    id: 501,
    bpid: 50,
    mpid: -1,
    name: '详情',
    router: '/users/:id',
  },
  {
    id: 51,
    bpid: 5,
    mpid: 5,
    name: '孵化器管理员',
    icon: 'solution',
    router: '/space_admins',
  },
  {
    id: 511,
    bpid: 51,
    mpid: -1,
    name: '创建',
    router: '/space_admins/create',
  },
  {
    id: 512,
    bpid: 51,
    mpid: -1,
    name: '详情',
    router: '/space_admins/:id',
  },
  {
    id: 513,
    bpid: 51,
    mpid: -1,
    name: '编辑',
    router: '/space_admins/:id/edit',
  },
  {
    id: 52,
    bpid: 5,
    mpid: 5,
    name: '法定假日管理',
    icon: 'calendar',
    router: '/holidays',
  },
  {
    id: 521,
    bpid: 52,
    mpid: -1,
    name: '创建',
    router: '/holidays/create',
  },
  {
    id: 522,
    bpid: 52,
    mpid: -1,
    name: '详情',
    router: '/holidays/:id',
  },
  {
    id: 523,
    bpid: 52,
    mpid: -1,
    name: '编辑',
    router: '/holidays/:id/edit',
  }
]