import modelExtend from 'dva-model-extend'
import { routerRedux } from 'dva/router'
import pathToRegexp from 'path-to-regexp'
import { query, get } from '../services/appointment'
import { pageModel } from './common'
import { config } from '../config'

export default modelExtend(pageModel, {
  namespace: 'appointment',

  state: {
    //criteria: {}
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/appointments') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
          return;
        }
        else {
        }
      })
    },
  },

  effects: {

    *query ({ payload = {} }, { call, put }) {
      const res = yield call(query, payload)
      const {success, data} = res
      if (success) {
        let {page, pageSize, ...criteria} = payload;
        //yield put({type: 'setCriteria', payload: { criteria: criteria }});
        yield put({
          type: 'querySuccess',
          payload: {
            list: data,
            pagination: {
              current: Number(page) || 1,
              pageSize: Number(pageSize) || 10,
              total: res.total,
              criteria
            },
          },
        })
      }
      else {
          throw res
      }
    },
    // *get ({payload}, {call, put}) {
    //   const res = yield call(get, payload)
    //     //console.log(res);
    //     const { success, message, data } = res
    //     if (success) {
    //         yield put({type: 'setItem', payload: { item: data }})
    //     }
    //     else {
    //       throw res
    //     }
    // },
  },

  reducers: {
    // setCriteria (state, { payload }) {
    //   const { criteria } = payload
    //   return {
    //     ...state,
    //     criteria,
    //   }
    // },
  },
})
