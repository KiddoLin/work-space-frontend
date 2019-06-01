import request from '../utils/request'
import config from '../config/config'
const { api } = config

export async function login (data) {
  return request({
    url: api.sessionLogin,
    method: 'post',
    data,
  })
}

export async function logout (params) {
  return request({
    url: api.sessionLogout,
    method: 'post',
    data: params,
  })
}

export async function query (params) {
  return request({
    url: api.sessionQuery,
    method: 'get',
    data: params,
  })
}
