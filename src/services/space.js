import request from '../utils/request'
import config from '../config/config'
const { api } = config
const { spaces, space } = api

export async function query (params) {
  return request({
    url: spaces,
    method: 'get',
    data: params,
  })
}

export async function get (params) {
  console.log(params);
  return request({
    url: space,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: spaces,
    method: 'post',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: space,
    method: 'put',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: space,
    method: 'delete',
    data: params,
  })
}

export async function pubOrUnpub (params) {
  return request({
    url: space,
    method: 'patch',
    data: params,
  })
}

export async function listAllNames (params) {
  return request({
    url: spaces + '?pageSize=10000&select=id,name&status=1',
    method: 'get',
    data: params,
  })
}

export async function listOmrs (params) {
  return request({
    url: space + '/omrs',
    method: 'get',
    data: params,
  })
}
