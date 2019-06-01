import request from '../utils/request'
import config from '../config/config'
const { api } = config
const { dashboard } = api


export async function query (params) {
  return request({
    url: dashboard,
    method: 'get',
    data: params,
  })
}
