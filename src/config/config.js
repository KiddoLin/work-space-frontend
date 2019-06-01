const API_VER = '/api/v1'

module.exports = {
  name: '管理后台',
  title: 'WorkSpace™ 管理后台',
  version: '1.4.0 build 1128',
  prefix: 'gsAdmin',
  footerText: '深圳市XXX有限公司  © 2017',
  logo: '/cocoworking.png',
  logo2: '/cocoworking2.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  YQL: [],
  //CORS: ['http://localhost:7000'],
  openPages: ['/login'],
  apiPrefix: API_VER,
  api: {
    sessionLogin: `${API_VER}/session/login`,
    sessionLogout: `${API_VER}/session/logout`,
    sessionQuery: `${API_VER}/session`,

    dashboard: `${API_VER}/dashboard`,

    spaces: `${API_VER}/spaces`,
    space: `${API_VER}/spaces/:id`,

    offices: `${API_VER}/offices`,
    office: `${API_VER}/offices/:id`,

    meetingrooms: `${API_VER}/meetingrooms`,
    meetingroom: `${API_VER}/meetingrooms/:id`,

    qiniuToken: `${API_VER}/qiniu/token`,

    // officeOrders: `${API_VER}/orders/office`,
    // officeOrder: `${API_VER}/orders/office/:id`,

    // meetingroomOrders: `${API_VER}/orders/meetingroom`,
    // meetingroomOrder: `${API_VER}/orders/meetingroom/:id`,

    officeOrders: `${API_VER}/orders?order_type=1`,
    officeOrder: `${API_VER}/orders/:id`,

    meetingroomOrders: `${API_VER}/orders?order_type=2`,
    meetingroomOrder: `${API_VER}/orders/:id`,

    users: `${API_VER}/users`,
    user: `${API_VER}/users/:id`,

    spaceAdmins: `${API_VER}/space_admins`,
    spaceAdmin: `${API_VER}/space_admins/:id`,

    moneyTranses: `${API_VER}/money_transes`,
    moneyTransesExportExcel: `${API_VER}/money_transes/export/excel`,

    appointments: `${API_VER}/appointments`,
    appointment: `${API_VER}/appointments/:id`,

    holidays: `${API_VER}/holidays`,
    holiday: `${API_VER}/holidays/:id`,

    qrcodeGen: `${API_VER}/qrcodes/gen`,

    promotions: `${API_VER}/promotions`,
    promotion: `${API_VER}/promotions/:id`,

    promotionOrders: `${API_VER}/promotion_orders`,
    promotionOrder: `${API_VER}/promotion_orders/:id`,
  },
}
