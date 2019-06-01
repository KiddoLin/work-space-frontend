import modelExtend from 'dva-model-extend'
import { routerRedux } from 'dva/router'
import pathToRegexp from 'path-to-regexp'
import { query, get, create, update, remove, pubOrUnpub } from '../services/meetingroom'
import { listAllNames } from '../services/space'
import { getToken } from '../services/qiniu'
import { genQrcode } from '../services/qrcode'
import { pageModel } from './common'
import { config } from '../config'


export default modelExtend(pageModel, {
  namespace: 'meetingroom',

  state: {
    isNew: false,
    item: {},
    qiniu: {},
    spaces: [],
    qrcode: {isShow: false}
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        //console.log('>>', location.pathname);
        if (location.pathname === '/meetingrooms') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
          return;
        }
        else if(location.pathname === '/meetingrooms/create'){
          dispatch({ type: 'setItem', payload: {item: {}, isNew: true}})
          dispatch({type: 'getToken'})
          dispatch({type: 'getSpaceNames'})
          return;
        }
        else {
          const match = pathToRegexp('/meetingrooms/:id/:opt?').exec(location.pathname);
          //console.log(match);
          if(match){
            dispatch({ type: 'get', payload: { id: match[1] } })
            if(match[2] || match[2]==='edit'){
               dispatch({type: 'getToken'})
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
        yield put(routerRedux.push('/meetingrooms'))
      } else {
        throw res
      }
    },

    *update ({ payload }, { call, put, select }) {

      const res = yield call(update, payload)
      //console.log(res);
      const { success, message, data } = res
      if (success) {
          const {pageSize, current, criteria} = yield select (_ => _.meetingroom.pagination)
          const query = Object.assign({page: current, ...pageSize}, criteria)
          yield put(routerRedux.push({pathname: '/meetingrooms', query: query}))
      }
      else {
        throw res
      }
    },

    *getToken ({payload}, {call, put, select }){
        const res = yield call(getToken, payload)
        const {success, data} = res;
        if(success){
            yield put({type: 'updateToken', payload: {qiniu: data}})
        }
        else
          throw res;
    },

    *genQrcode ({payload}, {call, put, select}){
        const res = yield call(genQrcode, payload)
        const {success, data} = res;
        if(success){
            yield put({type: 'updateQrcode', payload: {data: data}})
        }
        else
          throw res;
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

    *pubOrUnpub ({payload}, {call, put, select }){
        const res = yield call(pubOrUnpub, payload)
        //console.log(res);
        const { success, message, data } = res
        if (success) {
            //yield put({type: 'updateItem', payload: { item: data }})
            const {pageSize, current, criteria} = yield select (_ => _.meetingroom.pagination)
            const query = Object.assign({page: current, ...pageSize}, criteria)
            yield put(routerRedux.push({pathname: '/meetingrooms', query: query}))
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
          const {pageSize, current, criteria} = yield select (_ => _.meetingroom.pagination)
          const query = Object.assign({page: current, ...pageSize}, criteria)
          yield put(routerRedux.push({pathname: '/meetingrooms', query: query}))
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
    updateToken (state, {payload}) {
      const {qiniu} = payload
      //console.log('token>>>', qiniu);
      return {
        ...state,
        qiniu
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
    updateQrcode (state, {payload}) {
      const {data} = payload
      const isShow = true;
      let qrcode = {isShow, data};
      return {
        ...state,
        qrcode
      }
    },
    setQrcodeVisible (state, {payload}) {
      let {isShow} = payload;
      let {qrcode} = state;
      qrcode.isShow = isShow;
      return {
        ...state,
        qrcode
      }
    },
    clearQrcode (state, {payload}) {
      let {qrcode} = state;
      qrcode = {isShow: false};
      return {
        ...state,
        qrcode
      }
    },
  },
})
