import request from '../utils/request'
import config from '../config/config'
const { api } = config
const { spaces, space } = api

export async function getToken (params) {
  return request({
    url: api.qiniuToken,
    method: 'get',
    data: params,
  })
}
