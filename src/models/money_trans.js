import modelExtend from 'dva-model-extend'
import { routerRedux } from 'dva/router'
import pathToRegexp from 'path-to-regexp'
import { query, exportExcel } from '../services/money_trans'
import { pageModel } from './common'
import { config } from '../config'

export default modelExtend(pageModel, {
  namespace: 'moneyTrans',

  state: {
    //criteria: {}
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/money_transes') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
          return;
        }
        else {
          // const match = pathToRegexp('/money_transes/:id').exec(location.pathname);
          // //console.log(match);
          // if(match){
          //   dispatch({ type: 'get', payload: { id: match[1] } })
          // }
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
    *exportExcel ({payload}, {call, put}) {
       const res = yield call(exportExcel, payload)
       console.log(res);
       const {success, message} = res;
       if(success===false)
         throw res;
    }
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
