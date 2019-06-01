import React from 'react'
import PropTypes from 'prop-types'
import { Router } from 'dva/router'
import App from './pages/app.jsx'

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}

const Routers = function ({ history, app }) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute (nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/dashboard'))
          cb(null, { component: require('./pages/dashboard/index.jsx') })
        }, 'dashboard')
      },
      childRoutes: [
        {
          path: 'dashboard',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/dashboard'))
              cb(null, require('./pages/dashboard/index.jsx'))
            }, 'dashboard')
          },
        },
        {
          path: 'spaces',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/space'))
              cb(null, require('./pages/space/index.jsx'))
            }, 'spaces')
          },
        },{
          path: 'spaces/create',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/space'))
              cb(null, require('./pages/space/item/Edit.jsx'))
            }, 'space-create')
          }
        },{
          path: 'spaces/:id',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/space'))
              cb(null, require('./pages/space/item/View.jsx'))
            }, 'space-view')
          }
        }, {
          path: 'spaces/:id/edit',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/space'))
              cb(null, require('./pages/space/item/Edit.jsx'))
            }, 'space-edit')
          },
        },

        {
          path: 'offices',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/office'))
              cb(null, require('./pages/office/index.jsx'))
            }, 'offices')
          },
        },{
          path: 'offices/create',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/office'))
              cb(null, require('./pages/office/item/Edit.jsx'))
            }, 'office-create')
          }
        },{
          path: 'offices/:id',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/office'))
              cb(null, require('./pages/office/item/View.jsx'))
            }, 'office-view')
          }
        }, {
          path: 'offices/:id/edit',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/office'))
              cb(null, require('./pages/office/item/Edit.jsx'))
            }, 'office-edit')
          },
        },

        {
          path: 'meetingrooms',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/meetingroom'))
              cb(null, require('./pages/meetingroom/index.jsx'))
            }, 'meetingrooms')
          },
        },{
          path: 'meetingrooms/create',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/meetingroom'))
              cb(null, require('./pages/meetingroom/item/Edit.jsx'))
            }, 'meetingroom-create')
          }
        },{
          path: 'meetingrooms/:id',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/meetingroom'))
              cb(null, require('./pages/meetingroom/item/View.jsx'))
            }, 'meetingroom-view')
          }
        }, {
          path: 'meetingrooms/:id/edit',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/meetingroom'))
              cb(null, require('./pages/meetingroom/item/Edit.jsx'))
            }, 'meetingroom-edit')
          },
        },

        {
          path: 'orders/office',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/order/office'))
              cb(null, require('./pages/order/office/index.jsx'))
            }, 'orders-office')
          },
        },{
          path: 'orders/office/:id',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/order/office'))
              cb(null, require('./pages/order/office/item/View.jsx'))
            }, 'orders-office-view')
          }
        },
        {
          path: 'orders/meetingroom',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/order/meetingroom'))
              cb(null, require('./pages/order/meetingroom/index.jsx'))
            }, 'orders-meetingroom')
          },
        },{
          path: 'orders/meetingroom/:id',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/order/meetingroom'))
              cb(null, require('./pages/order/meetingroom/item/View.jsx'))
            }, 'orders-meetingroom-view')
          }
        },

        {
          path: 'orders/promotion',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/order/promotion'))
              cb(null, require('./pages/order/promotion/index.jsx'))
            }, 'orders-promotion')
          },
        },{
          path: 'orders/promotion/:id',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/order/promotion'))
              cb(null, require('./pages/order/promotion/item/View.jsx'))
            }, 'orders-promotion-view')
          }
        },


        {
          path: 'money_transes',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/money_trans'))
              cb(null, require('./pages/moneytrans/index.jsx'))
            }, 'moneyTranses')
          },
        },

        {
          path: 'appointments',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/appointment'))
              cb(null, require('./pages/appointment/index.jsx'))
            }, 'appointments')
          },
        },

        {
          path: 'users',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/user'))
              cb(null, require('./pages/user/index.jsx'))
            }, 'users')
          },
        },{
          path: 'users/:id',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/user'))
              cb(null, require('./pages/user/item/View.jsx'))
            }, 'user-view')
          }
        },

        {
          path: 'space_admins',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/space_admin'))
              cb(null, require('./pages/spaceadmin/index.jsx'))
            }, 'spaceadmins')
          },
        },{
          path: 'space_admins/create',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/space_admin'))
              cb(null, require('./pages/spaceadmin/item/Edit.jsx'))
            }, 'spaceadmin-create')
          }
        },{
          path: 'space_admins/:id',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/space_admin'))
              cb(null, require('./pages/spaceadmin/item/View.jsx'))
            }, 'spaceadmin-view')
          }
        }, {
          path: 'space_admins/:id/edit',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/space_admin'))
              cb(null, require('./pages/spaceadmin/item/Edit.jsx'))
            }, 'spaceadmin-edit')
          },
        },

        {
          path: 'holidays',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/holiday'))
              cb(null, require('./pages/holiday/index.jsx'))
            }, 'holidays')
          },
        },
        {
          path: 'holidays/create',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/holiday'))
              cb(null, require('./pages/holiday/item/Edit.jsx'))
            }, 'holiday-create')
          }
        },
        {
          path: 'holidays/:id/edit',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/holiday'))
              cb(null, require('./pages/holiday/item/Edit.jsx'))
            }, 'holiday-edit')
          },
        },

        {
          path: 'promotions',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/promotion'))
              cb(null, require('./pages/promotion/index.jsx'))
            }, 'promotions')
          },
        },
       {
          path: 'promotions/create',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/promotion'))
              cb(null, require('./pages/promotion/item/Edit.jsx'))
            }, 'promotion-create')
          },
        },{
          path: 'promotions/:id',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/promotion'))
              cb(null, require('./pages/promotion/item/View.jsx'))
            }, 'promotion-view')
          }
        },
        {
          path: 'promotions/:id/edit',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/promotion'))
              cb(null, require('./pages/promotion/item/Edit.jsx'))
            }, 'promotion-edit')
          },
        },

        {
          path: 'login',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/login'))
              cb(null, require('./pages/login/index.jsx'))
            }, 'login')
          },
        },

        {
          path: '*',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./pages/error/'))
            }, 'error')
          },
        },
      ],
    },
  ]

  return <Router history={history} routes={routes} />;
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
