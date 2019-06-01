import modelExtend from 'dva-model-extend'
import { routerRedux } from 'dva/router'
import pathToRegexp from 'path-to-regexp'
import { query, get, create, update, remove, removeDetail, addDetail } from '../services/promotion'
import { listAllNames, listOmrs } from '../services/space'
import { pageModel } from './common'
import { config } from '../config'

//const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'promotion',

  state: {
    isNew: false,
    item: {},
    spaces: [],
    omrs: {offices: [], meetingrooms: []}
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        //console.log('>>', location.pathname);
        if (location.pathname === '/promotions') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
          return;
        }
        else if(location.pathname === '/promotions/create'){
          dispatch({ type: 'setItem', payload: {item: {}, isNew: true}})
          dispatch({type: 'getSpaceNames'})
          return;
        }
        else {
          const match = pathToRegexp('/promotions/:id/:opt?').exec(location.pathname);
          //console.log(match);
          if(match){
            dispatch({ type: 'get', payload: { id: match[1] } });
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
        //yield put({ type: 'hideModal' })
        //yield put({ type: 'query' })
        yield put(routerRedux.push('/promotions'))
      } else {
        throw res
      }
    },

    *update ({ payload }, { call, put, select }) {

      const res = yield call(update, payload)
      //console.log(res);
      const { success, message, data } = res
      if (success) {
          const {pageSize, current, criteria} = yield select (_ => _.promotion.pagination)
          const query = Object.assign({page: current, ...pageSize}, criteria)
          yield put(routerRedux.push({pathname: '/promotions', query: query}))
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
          const {pageSize, current, criteria} = yield select (_ => _.promotion.pagination)
          const query = Object.assign({page: current, ...pageSize}, criteria)
          yield put(routerRedux.push({pathname: '/promotions', query: query}))
      }
      else {
        throw res
      }
    },

    *removeDetail ({ payload }, { call, put, select }) {

      const res = yield call(removeDetail, payload)
      //console.log(res);
      const { success, message, data } = res
      if (success) {
          yield put({type: 'removeItemDetail', payload: data})
      }
      else {
        throw res
      }
    },

    *addDetail ({ payload }, { call, put, select }) {

      const res = yield call(addDetail, payload)
      //console.log(res);
      const { success, message, data } = res
      if (success) {
          yield put({type: 'addItemDetail', payload: data})
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

    *getOmrs ({payload}, {call, put, select }){
        //clean old data
        yield put({type: 'loadOmrs', payload: {omrs: {offices: [], meetingrooms: []}}});
        //call API
        const res = yield call(listOmrs, payload)
        const {success, data} = res;
        //console.log(data);
        if(success){
            yield put({type: 'loadOmrs', payload: {omrs: data}})
        }
        else
          throw res;
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
    removeItemDetail(state, { payload }){
      let {item, ...other} = state;
      let {details, ...attrs} = item;
      const {detail_id} = payload;
      if(details){
         details = details.filter(d => d.id!==detail_id);
         item = {details, ...attrs};
      }
      return {
        item,
        ...other
      }
    },
    addItemDetail(state, { payload }){
      let {item, ...other} = state;
      let {details, ...attrs} = item;
      //const detail = payload;
      if(details){
         details = [...details, payload];
         item = {details, ...attrs};
      }
      return {
        item,
        ...other
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
    },
    loadOmrs (state, {payload}) {
      const { omrs } = payload
      return {
        ...state,
        omrs
      }
    },
  }
})
