import request from '../utils/request'
import config from '../config/config'
const { api } = config
const { meetingrooms, meetingroom } = api

export async function query (params) {
  return request({
    url: meetingrooms,
    method: 'get',
    data: params,
  })
}

export async function get (params) {
  console.log(params);
  return request({
    url: meetingroom,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: meetingrooms,
    method: 'post',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: meetingroom,
    method: 'put',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: meetingroom,
    method: 'delete',
    data: params,
  })
}

export async function pubOrUnpub (params) {
  return request({
    url: meetingroom,
    method: 'patch',
    data: params,
  })
}


