import modelExtend from 'dva-model-extend'
import { routerRedux } from 'dva/router'
import pathToRegexp from 'path-to-regexp'
import { query, get } from '../../services/order/office'
import { pageModel } from '../common'
import { config } from '../../config'


export default modelExtend(pageModel, {
  namespace: 'officeOrder',

  state: {
    item: {},
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        //console.log('>>', location.pathname);
        if (location.pathname === '/orders/office') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
          return;
        }
        else {
          const match = pathToRegexp('/orders/office/:id').exec(location.pathname);
          //console.log(match);
          if(match){
            dispatch({ type: 'get', payload: { id: match[1] } })
          }
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

    *get ({payload}, {call, put}) {
      const res = yield call(get, payload)
        //console.log(res);
        const { success, message, data } = res
        if (success) {
            yield put({type: 'setItem', payload: { item: data }})
        }
        else {
          throw res
        }
    },
  },

  reducers: {
    setItem (state, { payload }) {
      const { item } = payload
      return {
        ...state,
        item,
      }
    },
  },
})
