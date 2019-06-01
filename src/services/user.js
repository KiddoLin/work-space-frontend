import request from '../utils/request'
import config from '../config/config'

const { api } = config
const { users, user } = api

export async function query (params) {
  return request({
    url: users,
    method: 'get',
    data: params,
  })
}

export async function get (params) {
  console.log(params);
  return request({
    url: user,
    method: 'get',
    data: params,
  })
}

export async function patch (params) {
  return request({
    url: user,
    method: 'patch',
    data: params,
  })
}
