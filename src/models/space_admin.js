import modelExtend from 'dva-model-extend'
import { routerRedux } from 'dva/router'
import pathToRegexp from 'path-to-regexp'
import { query, get, create, update, patch } from '../services/space_admin'
import { listAllNames } from '../services/space'
import { pageModel } from './common'
import { config } from '../config'


export default modelExtend(pageModel, {
  namespace: 'spaceAdmin',
  state: {
    item: {},
    spaces: [],
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/space_admins') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
          return;
        }
        else if(location.pathname === '/space_admins/create'){
          dispatch({ type: 'setItem', payload: {item: {}, isNew: true}})
          dispatch({type: 'getSpaceNames'})
          return;
        }
        else {
          const match = pathToRegexp('/space_admins/:id/:opt?').exec(location.pathname);
          //console.log(match);
          if(match){
            dispatch({ type: 'get', payload: { id: match[1] } })
            if(match[2] || match[2]==='edit'){
               dispatch({type: 'getSpaceNames'})
            }
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
        yield put(routerRedux.push('/space_admins'))
      } else {
        throw res
      }
    },

    *update ({ payload }, { call, put, select }) {

      const res = yield call(update, payload)
      //console.log(res);
      const { success, message, data } = res
      if (success) {
          const {pageSize, current, criteria} = yield select (_ => _.spaceAdmin.pagination)
          const query = Object.assign({page: current, ...pageSize}, criteria)
          yield put(routerRedux.push({pathname: '/space_admins', query: query}))
      }
      else {
        throw res
      }
    },

    *getSpaceNames ({payload}, {call, put, select }){
        const res = yield call(listAllNames, payload)
        const {success, data} = res;
        //console.log(data);
        if(success){
            yield put({type: 'loadSpaces', payload: {spaces: data}})
        }
        else
          throw res;
    },

    *patch ({payload}, {call, put, select }){
        const res = yield call(patch, payload)
        //console.log(res);
        const { success, message, data } = res
        if (success) {
            //yield put({type: 'updateItem', payload: { item: data }})
            const {pageSize, current, criteria} = yield select (_ => _.spaceAdmin.pagination)
            const query = Object.assign({page: current, ...pageSize}, criteria)
            yield put(routerRedux.push({pathname: '/space_admins', query: query}))
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
    updateItem (state, {payload}) {
      const { item } = payload
      let {list, ...other} = state;
      list = list.map((obj) => obj.id===item.id ? item: obj);
      return {
        list,
        ...other
      }
    },
    loadSpaces (state, {payload}) {
      const { spaces } = payload
      return {
        ...state,
        spaces
      }
    }
  },
})
