import request from '../utils/request'
import config from '../config/config'
const { api } = config
const { holidays, holiday } = api

export async function query (params) {
  return request({
    url: holidays,
    method: 'get',
    data: params,
  })
}

export async function get (params) {
  console.log(params);
  return request({
    url: holiday,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: holidays,
    method: 'post',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: holiday,
    method: 'put',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: holiday,
    method: 'delete',
    data: params,
  })
}
