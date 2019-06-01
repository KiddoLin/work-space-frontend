import { myCity, queryWeather, query } from '../services/dashboard'
import { parse } from 'qs'


export default {
  namespace: 'dashboard',
  state: {
    stat: {
      space: 0,
      office: 0,
      meetingroom: 0,
      order: 0,
      user: 0
    }
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/dashboard') {
          //console.log(location.query);
          dispatch({ type: 'query' })
          return;
        }
      });
    },
  },
  effects: {
    *query ({
      payload,
    }, { call, put }) {
      //const data = yield call(query, parse(payload))
      const res = yield call(query, payload)
      const {success, data} = res
      if(success){
        yield put({ type: 'updateStat', payload: { ...data } })
      }
      else {
          throw res
      }
    },
  },
  reducers: {
    updateStat (state, action) {
      return {
        ...state,
        stat: action.payload,
      }
    },
  },
}
