import request from '../utils/request'
import config from '../config/config'

const { api } = config
const { spaceAdmins, spaceAdmin } = api

export async function query (params) {
  return request({
    url: spaceAdmins,
    method: 'get',
    data: params,
  })
}

export async function get (params) {
  //console.log(params);
  return request({
    url: spaceAdmin,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  //console.log(params);
  return request({
    url: spaceAdmins,
    method: 'post',
    data: params,
  })
}

export async function update (params) {
  //console.log(params);
  return request({
    url: spaceAdmin,
    method: 'put',
    data: params,
  })
}

export async function patch (params) {
  return request({
    url: spaceAdmin,
    method: 'patch',
    data: params,
  })
}
