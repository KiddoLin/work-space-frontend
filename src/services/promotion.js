import request from '../utils/request'
import config from '../config/config'
const { api } = config
const { promotions, promotion } = api

export async function query (params) {
  return request({
    url: promotions,
    method: 'get',
    data: params,
  })
}

export async function get (params) {
  console.log(params);
  return request({
    url: promotion,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: promotions,
    method: 'post',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: promotion,
    method: 'put',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: promotion,
    method: 'delete',
    data: params,
  })
}

export async function removeDetail (params) {
  return request({
    url: promotion + '/details/:did',
    method: 'delete',
    data: params,
  })
}

export async function addDetail (params) {
  return request({
    url: promotion + '/details',
    method: 'post',
    data: params,
  })
}
