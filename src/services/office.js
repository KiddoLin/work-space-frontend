import request from '../utils/request'
import config from '../config/config'
const { api } = config
const { offices, office } = api

export async function query (params) {
  return request({
    url: offices,
    method: 'get',
    data: params,
  })
}

export async function get (params) {
  console.log(params);
  return request({
    url: office,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: offices,
    method: 'post',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: office,
    method: 'put',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: office,
    method: 'delete',
    data: params,
  })
}

export async function pubOrUnpub (params) {
  return request({
    url: office,
    method: 'patch',
    data: params,
  })
}


