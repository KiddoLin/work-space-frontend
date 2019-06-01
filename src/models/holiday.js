import modelExtend from 'dva-model-extend'
import { routerRedux } from 'dva/router'
import pathToRegexp from 'path-to-regexp'
import { query, get, create, update, remove } from '../services/holiday'
import { pageModel } from './common'
import { config } from '../config'

//const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'holiday',

  state: {
    isNew: false,
    item: {}
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        //console.log('>>', location.pathname);
        if (location.pathname === '/holidays') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
          return;
        }
        else if(location.pathname === '/holidays/create'){
          dispatch({ type: 'setItem', payload: {item: {}, isNew: true}})
          return;
        }
        else {
          const match = pathToRegexp('/holidays/:id/:opt?').exec(location.pathname);
          //console.log(match);
          if(match){
            dispatch({ type: 'get', payload: { id: match[1] } });
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
            yield put({type: 'setItem', payload: { item: data, isNew: false}})
        }
        else {
          throw res
        }
    },

    *create ({ payload }, { call, put }) {
      const res = yield call(create, payload)
      const { success, message } = res
      if (success) {
        //yield put({ type: 'hideModal' })
        //yield put({ type: 'query' })
        yield put(routerRedux.push('/holidays'))
      } else {
        throw res
      }
    },

    *update ({ payload }, { call, put, select }) {

      const res = yield call(update, payload)
      //console.log(res);
      const { success, message, data } = res
      if (success) {
          const {pageSize, current, criteria} = yield select (_ => _.holiday.pagination)
          const query = Object.assign({page: current, ...pageSize}, criteria)
          yield put(routerRedux.push({pathname: '/holidays', query: query}))
      }
      else {
        throw res
      }
    },

    *remove ({ payload }, { call, put, select }) {

      const res = yield call(remove, payload)
      //console.log(res);
      const { success, message, data } = res
      if (success) {
          const {pageSize, current, criteria} = yield select (_ => _.holiday.pagination)
          const query = Object.assign({page: current, ...pageSize}, criteria)
          yield put(routerRedux.push({pathname: '/holidays', query: query}))
      }
      else {
        throw res
      }
    },
  },

  reducers: {
    setItem (state, { payload }) {
      const { isNew, item } = payload
      return {
        ...state,
        isNew,
        item,
      }
    },
    updateItem (state, {payload}) {
      const { item } = payload
      let {list, ...other} = state;
      list = list.map((obj) => obj.id===item.id ? item: obj);
      return {
        list,
        ...other
      }
    }
  },
})
